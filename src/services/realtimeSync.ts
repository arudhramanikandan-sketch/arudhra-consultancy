import { Job } from '../types';

export interface RealtimeJobEvent {
  action: 'created' | 'updated' | 'deleted' | 'sync' | 'connected';
  job?: Job;
  id?: string;
  jobs?: Job[];
  count?: number;
  timestamp?: string;
}

export type RealtimeListener = (event: RealtimeJobEvent) => void;
export type ConnectionStateListener = (connected: boolean) => void;

class RealtimeSyncManager {
  private listeners: Set<RealtimeListener> = new Set();
  private connectionListeners: Set<ConnectionStateListener> = new Set();
  private ws: WebSocket | null = null;
  private sse: EventSource | null = null;
  private isConnected: boolean = false;
  private reconnectTimer: any = null;
  private reconnectAttempts: number = 0;
  private isDestroyed: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
      // Handle tab visibility change to verify connection
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && !this.isConnected) {
          this.connect();
        }
      });
    }
  }

  private init() {
    this.connect();
  }

  public subscribe(listener: RealtimeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public subscribeConnection(listener: ConnectionStateListener): () => void {
    this.connectionListeners.add(listener);
    listener(this.isConnected);
    return () => {
      this.connectionListeners.delete(listener);
    };
  }

  public getConnected(): boolean {
    return this.isConnected;
  }

  private setConnected(state: boolean) {
    if (this.isConnected !== state) {
      this.isConnected = state;
      this.connectionListeners.forEach(listener => {
        try {
          listener(state);
        } catch (e) {}
      });
    }
  }

  private broadcast(event: RealtimeJobEvent) {
    this.listeners.forEach(listener => {
      try {
        listener(event);
      } catch (e) {
        console.error('[RealtimeSync] Listener error:', e);
      }
    });
  }

  private connect() {
    if (this.isDestroyed) return;
    this.cleanupConnections();

    // Prefer WebSocket with automatic graceful fallback to Server-Sent Events (SSE)
    try {
      const isSecure = window.location.protocol === 'https:';
      const wsProtocol = isSecure ? 'wss:' : 'ws:';
      const wsUrl = `${wsProtocol}//${window.location.host}/api/jobs/ws`;

      const ws = new WebSocket(wsUrl);
      this.ws = ws;

      const connectionTimeout = setTimeout(() => {
        if (ws.readyState !== WebSocket.OPEN) {
          ws.close();
          this.fallbackToSSE();
        }
      }, 4000);

      ws.onopen = () => {
        clearTimeout(connectionTimeout);
        this.setConnected(true);
        this.reconnectAttempts = 0;
      };

      ws.onmessage = (message) => {
        try {
          const data: RealtimeJobEvent = JSON.parse(message.data);
          if (data.action === 'connected') {
            this.setConnected(true);
          }
          this.broadcast(data);
        } catch (e) {}
      };

      ws.onclose = () => {
        clearTimeout(connectionTimeout);
        if (this.ws === ws) {
          this.setConnected(false);
          this.ws = null;
          this.fallbackToSSE();
        }
      };

      ws.onerror = () => {
        clearTimeout(connectionTimeout);
        if (this.ws === ws) {
          try {
            ws.close();
          } catch (e) {}
          this.fallbackToSSE();
        }
      };
    } catch (e) {
      this.fallbackToSSE();
    }
  }

  private fallbackToSSE() {
    if (this.isDestroyed || this.sse || this.ws?.readyState === WebSocket.OPEN) return;

    try {
      const sse = new EventSource('/api/jobs/stream');
      this.sse = sse;

      sse.onopen = () => {
        this.setConnected(true);
        this.reconnectAttempts = 0;
      };

      sse.onmessage = (message) => {
        try {
          const data: RealtimeJobEvent = JSON.parse(message.data);
          if (data.action === 'connected') {
            this.setConnected(true);
          }
          this.broadcast(data);
        } catch (e) {}
      };

      sse.onerror = () => {
        this.setConnected(false);
        this.cleanupConnections();
        this.scheduleReconnect();
      };
    } catch (e) {
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (this.isDestroyed || this.reconnectTimer) return;
    const delay = Math.min(1000 * Math.pow(1.5, this.reconnectAttempts), 10000);
    this.reconnectAttempts++;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, delay);
  }

  private cleanupConnections() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      try {
        this.ws.close();
      } catch (e) {}
      this.ws = null;
    }
    if (this.sse) {
      try {
        this.sse.close();
      } catch (e) {}
      this.sse = null;
    }
  }

  public destroy() {
    this.isDestroyed = true;
    this.cleanupConnections();
    this.listeners.clear();
    this.connectionListeners.clear();
  }
}

export const realtimeSync = new RealtimeSyncManager();
