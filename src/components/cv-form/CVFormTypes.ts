import {
  CVPersonalDetails,
  CVEducationRecord,
  CVEmploymentRecord,
  CVSkillsData,
  CVProjectRecord,
  CVInternshipRecord,
  CVCertificationRecord,
  CVSeminarRecord,
  CVActivityRecord,
  CVAchievementRecord,
  CVOverseasInfo,
  CVSupportingDocument
} from '../../types';

export const createDefaultPersonalDetails = (): CVPersonalDetails => ({
  fullName: '',
  mobile: '',
  email: '',
  fatherParentName: '',
  dateOfBirth: '',
  gender: '',
  maritalStatus: '',
  nationality: 'Indian',
  currentCity: '',
  country: 'India',
  communicationAddress: '',
  profilePhotoUrl: ''
});

export const createEmptyEducationRecord = (): CVEducationRecord => ({
  id: `edu-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
  qualificationLevel: 'Diploma',
  courseDegree: '',
  specialization: '',
  schoolCollege: '',
  boardUniversity: '',
  location: '',
  yearJoining: '',
  yearPassing: '',
  percentageCgpa: '',
  notes: ''
});

export const createEmptyEmploymentRecord = (): CVEmploymentRecord => ({
  id: `emp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
  companyName: '',
  jobTitle: '',
  location: '',
  startDate: '',
  endDate: '',
  isCurrentlyWorking: false,
  responsibilities: '',
  keySkills: '',
  achievements: ''
});

export const createDefaultSkillsData = (): CVSkillsData => ({
  technicalSkills: [],
  softwareTools: [],
  professionalSkills: [],
  languagesKnown: [
    { name: 'English', proficiency: 'Fluent' },
    { name: 'Tamil', proficiency: 'Native' }
  ],
  otherSkills: []
});

export const createEmptyProjectRecord = (): CVProjectRecord => ({
  id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
  title: '',
  description: '',
  role: '',
  toolsUsed: '',
  duration: '',
  outcome: ''
});

export const createEmptyInternshipRecord = (): CVInternshipRecord => ({
  id: `int-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  responsibilities: '',
  skillsLearned: ''
});

export const createEmptyCertificationRecord = (): CVCertificationRecord => ({
  id: `cert-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
  name: '',
  issuingOrganization: '',
  yearDate: '',
  certificateId: '',
  description: ''
});

export const createEmptySeminarRecord = (): CVSeminarRecord => ({
  id: `sem-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
  title: '',
  organization: '',
  dateYear: '',
  description: ''
});

export const createEmptyActivityRecord = (): CVActivityRecord => ({
  id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
  category: 'Sports',
  title: '',
  description: ''
});

export const createEmptyAchievementRecord = (): CVAchievementRecord => ({
  id: `ach-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
  title: '',
  description: '',
  dateYear: ''
});

export const createDefaultOverseasInfo = (): CVOverseasInfo => ({
  preferredPosition: '',
  preferredCountry: 'Singapore',
  preferredLocation: '',
  passportAvailable: 'Yes',
  passportExpiryDate: '',
  visaStatus: 'No active visa / Ready for S Pass or Work Permit',
  noticePeriod: 'Immediate / 15 Days',
  drivingLicence: '',
  linkedinProfile: '',
  portfolioWebsite: ''
});
