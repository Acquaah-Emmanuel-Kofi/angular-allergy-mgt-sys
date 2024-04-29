export interface AllergyFact {
    id: number;
    title: string;
    fact: string;
}

export interface History {
  date: string;
  id: number;
  favorite: boolean;
  message: string;
}

export interface FormData {
  medicalCondition: string;
  medicalConditionExplained: string;
  onMedication: string;
  allergySymptoms: string;
  symptomSeverity: string;
  causeOfSymptom: string;
  timesOfReaction: string;
  allergyExposedTo: string;
  doesTheUserSmoke: string;
  additionalNotes: string;
}

export interface User {
  iss?: string;
  azp?: string;
  aud?: string;
  sub?: string;
  email?: string;
  email_verified?: boolean;
  nbf?: number;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  iat?: number;
  exp?: number;
  jti?: string;
}


