import { JobCategory, JobType } from '../types';

export interface WhatsAppVacancyExtractionResult {
  title?: string;
  category?: JobCategory;
  categoryConfident: boolean;
  salary?: string;
  jobType?: JobType;
  location?: string;
  experience?: string;
  qualification?: string;
  vacancyCount?: number;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  requiredDocuments?: string[];
  source?: 'gemini' | 'local_parser';
  rawPastedText: string;
  extractedFields: string[];
  missingFields: string[];
}

export const VALID_CATEGORIES: JobCategory[] = [
  'Manufacturing & Production',
  'Marine & Shipyard',
  'F&B & Hospitality',
  'Logistics & Warehouse',
  'Construction & Civil',
  'Electrical & Maintenance',
  'Automotive & Mechanical',
  'Retail & Customer Service',
  'Healthcare & Nursing',
  'IT & Admin Support',
];

/**
 * Intelligently classifies a job title and message content into an existing JobCategory.
 * Returns undefined if no high-confidence category is matched.
 */
export function inferJobCategory(title: string, fullText: string): { category?: JobCategory; confident: boolean } {
  const combined = `${title} ${fullText}`.toLowerCase();

  // Safety / HSE
  if (
    combined.includes('safety') ||
    combined.includes('hse') ||
    combined.includes('ehs') ||
    combined.includes('wsh') ||
    combined.includes('workplace safety')
  ) {
    return { category: 'Construction & Civil', confident: true };
  }

  // Lifting / Rigging / Construction / Civil / Structural / Painter / Mason / Scaffolding
  if (
    combined.includes('lifting') ||
    combined.includes('rigging') ||
    combined.includes('rigger') ||
    combined.includes('crane') ||
    combined.includes('construction') ||
    combined.includes('civil') ||
    combined.includes('scaffold') ||
    combined.includes('mason') ||
    combined.includes('carpenter') ||
    combined.includes('bar bender') ||
    combined.includes('rebar') ||
    combined.includes('tile') ||
    combined.includes('plaster') ||
    combined.includes('excavator') ||
    combined.includes('pipe fitter') ||
    combined.includes('plumber')
  ) {
    return { category: 'Construction & Civil', confident: true };
  }

  // Marine / Shipyard
  if (
    combined.includes('shipyard') ||
    combined.includes('marine') ||
    combined.includes('hull') ||
    combined.includes('vessel') ||
    combined.includes('ship') ||
    combined.includes('offshore') ||
    combined.includes('dockyard')
  ) {
    return { category: 'Marine & Shipyard', confident: true };
  }

  // Electrical / Electronics / Instrument / Maintenance
  if (
    combined.includes('electrician') ||
    combined.includes('electrical') ||
    combined.includes('wiring') ||
    combined.includes('electronic') ||
    combined.includes('instrumentation') ||
    combined.includes('facility maintenance') ||
    combined.includes('hvac') ||
    combined.includes('aircon') ||
    combined.includes('air-con') ||
    combined.includes('technician')
  ) {
    return { category: 'Electrical & Maintenance', confident: true };
  }

  // Automotive / Mechanical
  if (
    combined.includes('mechanic') ||
    combined.includes('automotive') ||
    combined.includes('diesel') ||
    combined.includes('engine') ||
    combined.includes('motor vehicle') ||
    combined.includes('auto electrician')
  ) {
    return { category: 'Automotive & Mechanical', confident: true };
  }

  // CNC / Welder / Manufacturing / Production / Assembly / Machinist / Turner
  if (
    combined.includes('cnc') ||
    combined.includes('milling') ||
    combined.includes('lathe') ||
    combined.includes('machinist') ||
    combined.includes('welder') ||
    combined.includes('welding') ||
    combined.includes('fabricat') ||
    combined.includes('production') ||
    combined.includes('manufacturing') ||
    combined.includes('factory') ||
    combined.includes('operator') ||
    combined.includes('assembler') ||
    combined.includes('mould') ||
    combined.includes('sheet metal')
  ) {
    return { category: 'Manufacturing & Production', confident: true };
  }

  // Transport / Driver / Logistics / Warehouse / Forklift / Storekeeper
  if (
    combined.includes('driver') ||
    combined.includes('forklift') ||
    combined.includes('warehouse') ||
    combined.includes('storekeeper') ||
    combined.includes('logistics') ||
    combined.includes('delivery') ||
    combined.includes('material handler') ||
    combined.includes('class 3') ||
    combined.includes('class 4') ||
    combined.includes('class 5')
  ) {
    return { category: 'Logistics & Warehouse', confident: true };
  }

  // F&B / Hospitality / Cook / Chef / Kitchen / Waiter / Housekeeping / Hotel / Cleaner
  if (
    combined.includes('chef') ||
    combined.includes('cook') ||
    combined.includes('kitchen') ||
    combined.includes('f&b') ||
    combined.includes('hotel') ||
    combined.includes('housekeeping') ||
    combined.includes('cleaner') ||
    combined.includes('cleaning') ||
    combined.includes('waiter') ||
    combined.includes('service crew') ||
    combined.includes('dishwash') ||
    combined.includes('restaurant') ||
    combined.includes('barista')
  ) {
    return { category: 'F&B & Hospitality', confident: true };
  }

  // Retail / Cashier / Sales
  if (
    combined.includes('retail') ||
    combined.includes('cashier') ||
    combined.includes('sales assistant') ||
    combined.includes('promoter') ||
    combined.includes('customer service')
  ) {
    return { category: 'Retail & Customer Service', confident: true };
  }

  // Healthcare / Nursing / Caregiver
  if (
    combined.includes('nurse') ||
    combined.includes('nursing') ||
    combined.includes('healthcare') ||
    combined.includes('caregiver') ||
    combined.includes('hospital') ||
    combined.includes('clinic')
  ) {
    return { category: 'Healthcare & Nursing', confident: true };
  }

  // IT / Admin Support
  if (
    combined.includes('it ') ||
    combined.includes('admin') ||
    combined.includes('software') ||
    combined.includes('data entry') ||
    combined.includes('clerk')
  ) {
    return { category: 'IT & Admin Support', confident: true };
  }

  return { category: undefined, confident: false };
}

/**
 * Normalizes salary representations into clean standard SGD format.
 */
function cleanSalaryText(raw: string): string {
  let s = raw.trim();
  // Strip trailing period or bullet
  s = s.replace(/[•\*\-\.]+$/, '').trim();

  // If already starts with SGD or $, standardize
  if (!s.toUpperCase().includes('SGD') && !s.startsWith('$')) {
    s = `SGD ${s}`;
  } else if (s.startsWith('$')) {
    s = s.replace(/^\$\s*/, 'SGD ');
  }
  return s;
}

/**
 * Normalizes pass types
 */
function parsePassType(raw: string): JobType | undefined {
  const lower = raw.toLowerCase();
  if (lower.includes('nts')) return 'NTS Work Permit';
  if (lower.includes('pcm')) return 'PCM';
  if (lower.includes('marine permit') || lower.includes('marine pass')) return 'Marine Permit';
  if (lower.includes('construction permit')) return 'Construction Permit';
  if (lower.includes('s pass') || lower.includes('spass') || lower === 'sp') return 'S Pass';
  if (lower.includes('e pass') || lower.includes('epass') || lower === 'ep') return 'E Pass';
  if (
    lower.includes('work permit') ||
    lower.includes('wp') ||
    lower.includes('workpermit') ||
    lower.includes('work-permit')
  ) {
    return 'Work Permit';
  }
  return undefined;
}

/**
 * Parses raw WhatsApp vacancy message into structured fields without fabricating any data.
 */
export function parseWhatsAppVacancyMessage(rawText: string): WhatsAppVacancyExtractionResult {
  const trimmed = rawText.trim();
  if (!trimmed) {
    return {
      categoryConfident: false,
      rawPastedText: '',
      extractedFields: [],
      missingFields: [
        'Job Title',
        'Sector / Category',
        'Salary (in SGD)',
        'Job / Pass Type',
        'Singapore Location',
        'Experience Required',
        'Qualification',
        'Vacancy Openings',
        'Job Description',
      ],
    };
  }

  // Clean common WhatsApp artifacts: emojis, markdown asterisks, bullet prefixes
  const lines = trimmed.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  let extractedTitle: string | undefined;
  let extractedSalary: string | undefined;
  let extractedPassType: JobType | undefined;
  let extractedLocation: string | undefined;
  let extractedExperience: string | undefined;
  let extractedQualification: string | undefined;
  let extractedVacancies: number | undefined;
  let extractedDescription: string | undefined;

  // Track lines that matched structured labels so remainder can be used for description or title
  const consumedLineIndices = new Set<number>();

  // Patterns for explicit line key-value matching
  lines.forEach((line, idx) => {
    // Strip leading markdown bullets/emojis like * - • # 1.
    const cleanLine = line.replace(/^[•\*\-\#\d\.\)\:\>\s]+/, '').trim();
    const lowerLine = cleanLine.toLowerCase();

    // 1. Salary matching
    if (
      !extractedSalary &&
      (lowerLine.startsWith('salary') ||
        lowerLine.startsWith('basic') ||
        lowerLine.startsWith('pay') ||
        lowerLine.startsWith('wages') ||
        lowerLine.startsWith('package') ||
        /^(sgd|\$)\s*\d+/.test(lowerLine))
    ) {
      const match = cleanLine.match(/(?:salary|basic|pay|wages|package)?\s*[:=\-–]?\s*(.+)/i);
      if (match && match[1] && match[1].trim().length > 1) {
        extractedSalary = cleanSalaryText(match[1].trim());
        consumedLineIndices.add(idx);
        return;
      }
    }

    // 2. Pass Type matching
    if (
      !extractedPassType &&
      (lowerLine.startsWith('pass') ||
        lowerLine.startsWith('visa') ||
        lowerLine.startsWith('permit') ||
        lowerLine.startsWith('job type') ||
        /\b(wp|s pass|e pass|work permit|nts)\b/.test(lowerLine))
    ) {
      const match = cleanLine.match(/(?:pass\s*type|pass|visa|permit|job\s*type)?\s*[:=\-–]?\s*(.+)/i);
      const val = match ? match[1].trim() : cleanLine;
      const parsed = parsePassType(val);
      if (parsed) {
        extractedPassType = parsed;
        consumedLineIndices.add(idx);
        return;
      }
    }

    // 3. Location matching
    if (
      !extractedLocation &&
      (lowerLine.startsWith('location') ||
        lowerLine.startsWith('place') ||
        lowerLine.startsWith('area') ||
        lowerLine.startsWith('work location') ||
        lowerLine.startsWith('workplace'))
    ) {
      const match = cleanLine.match(/(?:work\s*location|workplace|location|place|area)\s*[:=\-–]?\s*(.+)/i);
      if (match && match[1]) {
        let loc = match[1].trim();
        if (!loc.toLowerCase().includes('singapore')) {
          loc = `${loc}, Singapore`;
        }
        extractedLocation = loc;
        consumedLineIndices.add(idx);
        return;
      }
    }

    // 4. Experience matching
    if (
      !extractedExperience &&
      (lowerLine.startsWith('experience') ||
        lowerLine.startsWith('exp') ||
        lowerLine.startsWith('req exp') ||
        lowerLine.startsWith('required experience'))
    ) {
      const match = cleanLine.match(/(?:required\s*experience|req\s*exp|experience|exp)\s*[:=\-–]?\s*(.+)/i);
      if (match && match[1]) {
        extractedExperience = match[1].trim();
        consumedLineIndices.add(idx);
        return;
      }
    }

    // 5. Qualification matching
    if (
      !extractedQualification &&
      (lowerLine.startsWith('qualification') ||
        lowerLine.startsWith('education') ||
        lowerLine.startsWith('qual') ||
        lowerLine.startsWith('eligibility'))
    ) {
      const match = cleanLine.match(/(?:qualification|education|qual|eligibility)\s*[:=\-–]?\s*(.+)/i);
      if (match && match[1]) {
        extractedQualification = match[1].trim();
        consumedLineIndices.add(idx);
        return;
      }
    }

    // 6. Vacancy Count matching
    if (
      extractedVacancies === undefined &&
      (lowerLine.startsWith('vacancy') ||
        lowerLine.startsWith('vacancies') ||
        lowerLine.startsWith('openings') ||
        lowerLine.startsWith('no of vacancy') ||
        lowerLine.startsWith('no of openings') ||
        lowerLine.startsWith('slots') ||
        lowerLine.startsWith('positions'))
    ) {
      const match = cleanLine.match(/(?:vacancies|vacancy|openings|slots|positions|no\s*of\s*vacancy|no\s*of\s*openings)\s*[:=\-–]?\s*(\d+)/i);
      if (match && match[1]) {
        const num = parseInt(match[1], 10);
        if (!isNaN(num) && num > 0) {
          extractedVacancies = num;
          consumedLineIndices.add(idx);
          return;
        }
      }
    }

    // 7. Job Description / Duties matching
    if (
      !extractedDescription &&
      (lowerLine.startsWith('job description') ||
        lowerLine.startsWith('description') ||
        lowerLine.startsWith('jd') ||
        lowerLine.startsWith('duties') ||
        lowerLine.startsWith('job role') ||
        lowerLine.startsWith('scope') ||
        lowerLine.startsWith('work details'))
    ) {
      const match = cleanLine.match(/(?:job\s*description|description|jd|duties|job\s*role|scope|work\s*details)\s*[:=\-–]?\s*(.+)/i);
      if (match && match[1]) {
        extractedDescription = match[1].trim();
        consumedLineIndices.add(idx);
        return;
      }
    }

    // 8. Explicit Title label matching
    if (
      !extractedTitle &&
      (lowerLine.startsWith('job title') ||
        lowerLine.startsWith('title') ||
        lowerLine.startsWith('position') ||
        lowerLine.startsWith('role') ||
        lowerLine.startsWith('designation') ||
        lowerLine.startsWith('post') ||
        lowerLine.startsWith('required:'))
    ) {
      const match = cleanLine.match(/(?:job\s*title|title|position|role|designation|post|required)\s*[:=\-–]?\s*(.+)/i);
      if (match && match[1]) {
        extractedTitle = match[1].replace(/^[•\*\-\s]+|[•\*\-\s]+$/g, '').trim();
        consumedLineIndices.add(idx);
        return;
      }
    }
  });

  // Secondary pass: In-line regex scanning for unconsumed text or formats without explicit line labels

  // Title fallback: First unconsumed non-trivial line, or "Required: X" / "Urgent Requirement: X"
  if (!extractedTitle) {
    for (let i = 0; i < lines.length; i++) {
      if (consumedLineIndices.has(i)) continue;
      const clean = lines[i].replace(/^[•\*\-\#\d\.\)\:\>\s]+/, '').replace(/[\*\_]/g, '').trim();
      if (!clean) continue;

      // Ignore generic headers like "SINGAPORE VACANCY", "URGENT RECRUITMENT", "JOB OPENING"
      const lower = clean.toLowerCase();
      if (
        lower === 'singapore vacancy' ||
        lower === 'singapore vacancies' ||
        lower === 'singapore job' ||
        lower === 'urgent requirement' ||
        lower === 'urgent openings' ||
        lower === 'arudhra consultancy' ||
        lower.startsWith('dear candidates')
      ) {
        continue;
      }

      // Check if it's "Required: <Title>" or "<Title> required in <Location>"
      const reqMatch = clean.match(/^(?:required|urgent|wanted|vacancy for)\s*[:\-–]?\s*(.+)/i);
      if (reqMatch && reqMatch[1]) {
        extractedTitle = reqMatch[1].trim();
        consumedLineIndices.add(i);
        break;
      }

      const reqInMatch = clean.match(/^(.+?)\s+(?:required|urgently required|needed)\s+(?:in|for)\s+(.+)/i);
      if (reqInMatch && reqInMatch[1]) {
        extractedTitle = reqInMatch[1].trim();
        if (!extractedLocation && reqInMatch[2]) {
          extractedLocation = reqInMatch[2].trim();
          if (!extractedLocation.toLowerCase().includes('singapore')) {
            extractedLocation = `${extractedLocation}, Singapore`;
          }
        }
        consumedLineIndices.add(i);
        break;
      }

      // Treat the first substantial line as Job Title
      if (clean.length >= 3 && clean.length <= 60 && !clean.includes('http')) {
        extractedTitle = clean;
        consumedLineIndices.add(i);
        break;
      }
    }
  }

  // Salary fallback scan anywhere in text (e.g. "1800 to 2500 SGD + OT" or "SGD 2200-2800")
  if (!extractedSalary) {
    const salaryRegex = /(?:salary\s*[:=\-–]?\s*)?(?:sgd|\$)?\s*(\d{3,5}\s*(?:to|\-–|\/)\s*(?:sgd|\$)?\s*\d{3,5}(?:\s*\+\s*ot)?|\d{3,5}\s*(?:sgd|\$)(?:\s*\+\s*ot)?)/i;
    const match = trimmed.match(salaryRegex);
    if (match && match[0]) {
      extractedSalary = cleanSalaryText(match[0].trim());
    }
  }

  // Pass Type fallback scan
  if (!extractedPassType) {
    if (/\bnts\b/i.test(trimmed)) extractedPassType = 'NTS Work Permit';
    else if (/\bpcm\b/i.test(trimmed)) extractedPassType = 'PCM';
    else if (/\bmarine permit\b/i.test(trimmed)) extractedPassType = 'Marine Permit';
    else if (/\bconstruction permit\b/i.test(trimmed)) extractedPassType = 'Construction Permit';
    else if (/\bs\s*pass\b/i.test(trimmed)) extractedPassType = 'S Pass';
    else if (/\be\s*pass\b/i.test(trimmed)) extractedPassType = 'E Pass';
    else if (/\b(work\s*permit|wp)\b/i.test(trimmed)) extractedPassType = 'Work Permit';
  }

  // Location fallback scan (Singapore areas like Jurong, Tuas, Changi, Woodlands, etc.)
  if (!extractedLocation) {
    const sgAreas = ['Jurong', 'Tuas', 'Changi', 'Woodlands', 'Boon Lay', 'Yishun', 'Tampines', 'Ang Mo Kio', 'Pioneer', 'Benoi', 'Gul', 'Kallang', 'Clementi', 'Bedok', 'Pasir Ris', 'Senoko', 'Marina'];
    for (const area of sgAreas) {
      if (new RegExp(`\\b${area}\\b`, 'i').test(trimmed)) {
        extractedLocation = `${area}, Singapore`;
        break;
      }
    }
    if (!extractedLocation && /\bsingapore\b/i.test(trimmed)) {
      extractedLocation = 'Singapore';
    }
  }

  // Experience fallback scan (e.g. "1-2 years experience" or "3 years exp")
  if (!extractedExperience) {
    const expRegex = /(\d+(?:\s*[\-–to]\s*\d+)?\s*(?:\+\s*)?years?\s*(?:experience|exp|sg|gulf)?)/i;
    const match = trimmed.match(expRegex);
    if (match && match[1]) {
      extractedExperience = match[1].trim();
    }
  }

  // Qualification fallback scan (e.g. "ITI/Diploma", "10th / 12th", "B.E / B.Tech")
  if (!extractedQualification) {
    const qualRegex = /\b(iti\s*(?:\/|\s*or\s*)\s*diploma|diploma|iti|degree|b\.?e\.?|b\.?tech|high\s*school|10th|12th|sslc|hsc)\b/i;
    const match = trimmed.match(qualRegex);
    if (match && match[0]) {
      extractedQualification = match[0].trim().toUpperCase();
    }
  }

  // Vacancy openings fallback scan (e.g. "5 vacancies" or "Openings 2" or "2 nos")
  if (extractedVacancies === undefined) {
    const vacRegex = /(\d+)\s*(?:vacancies|vacancy|openings|nos|slots|positions)/i;
    const match = trimmed.match(vacRegex);
    if (match && match[1]) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num > 0) {
        extractedVacancies = num;
      }
    } else {
      const openRegex = /(?:openings|vacancies|no\s*of\s*vacancy)\s*[:=\-–]?\s*(\d+)/i;
      const match2 = trimmed.match(openRegex);
      if (match2 && match2[1]) {
        const num2 = parseInt(match2[1], 10);
        if (!isNaN(num2) && num2 > 0) {
          extractedVacancies = num2;
        }
      }
    }
  }

  // Job Description fallback: Collect unconsumed lines that don't look like contact/admin info
  if (!extractedDescription) {
    const descLines: string[] = [];
    lines.forEach((line, idx) => {
      if (consumedLineIndices.has(idx)) return;
      const clean = line.replace(/^[•\*\-\#\d\.\)\:\>\s]+/, '').replace(/[\*\_]/g, '').trim();
      if (!clean) return;

      const lower = clean.toLowerCase();
      // Filter out phone numbers, emails, whatsapp contact links
      if (
        lower.includes('contact') ||
        lower.includes('whatsapp') ||
        lower.includes('call') ||
        lower.includes('send cv') ||
        lower.includes('send resume') ||
        lower.includes('apply now') ||
        lower.includes('http') ||
        lower.includes('www.') ||
        lower.includes('@') ||
        /^\+?\d{8,15}$/.test(clean.replace(/[\s\-\(\)]/g, ''))
      ) {
        return;
      }

      // If it looks like descriptive text
      if (clean.length > 10 && clean !== extractedTitle) {
        descLines.push(clean);
      }
    });

    if (descLines.length > 0) {
      extractedDescription = descLines.slice(0, 3).join('. ');
    }
  }

  // Infer Sector / Category based on extracted title & whole message
  const categoryResult = inferJobCategory(extractedTitle || '', trimmed);

  // Compile extracted & missing lists
  const extractedFields: string[] = [];
  const missingFields: string[] = [];

  if (extractedTitle) extractedFields.push('Job Title');
  else missingFields.push('Job Title');

  if (categoryResult.confident && categoryResult.category) extractedFields.push('Sector / Category');
  else missingFields.push('Sector / Category');

  if (extractedSalary) extractedFields.push('Salary (in SGD)');
  else missingFields.push('Salary (in SGD)');

  if (extractedPassType) extractedFields.push('Job / Pass Type');
  else missingFields.push('Job / Pass Type');

  if (extractedLocation) extractedFields.push('Singapore Location');
  else missingFields.push('Singapore Location');

  if (extractedExperience) extractedFields.push('Experience Required');
  else missingFields.push('Experience Required');

  if (extractedQualification) extractedFields.push('Qualification');
  else missingFields.push('Qualification');

  if (extractedVacancies !== undefined) extractedFields.push('Vacancy Openings');
  else missingFields.push('Vacancy Openings');

  if (extractedDescription) extractedFields.push('Job Description');
  else missingFields.push('Job Description');

  return {
    title: extractedTitle,
    category: categoryResult.category,
    categoryConfident: categoryResult.confident,
    salary: extractedSalary,
    jobType: extractedPassType,
    location: extractedLocation,
    experience: extractedExperience,
    qualification: extractedQualification,
    vacancyCount: extractedVacancies,
    description: extractedDescription,
    rawPastedText: trimmed,
    extractedFields,
    missingFields,
  };
}
