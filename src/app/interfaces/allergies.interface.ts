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