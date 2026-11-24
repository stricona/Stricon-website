export interface CoreValue {
  title: string;
  text: string;
}

export interface StrengthsGroup {
  category: string;
  items: string[];
}

export interface ProfileContent {
  about: string;
  aboutParagraphs: string[];
  mission: string;
  vision: string;
  coreValues: CoreValue[];
  integratedFacilityManagementStatement: string;
  bundlingNote: string;
  continuousTrainingTopics: string[];
  recruitmentProcess: string[];
  employeeWelfare: string[];
  strengths: StrengthsGroup[];
  valueAddedServices: string[];
  whyStricon: string[];
  clientsHeading: string;
  clientsSentence: string;
}
