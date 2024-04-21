export interface AllergyFact {
    id: number;
    title: string;
    fact: string;
}

export interface History {
  id: number;
  title: string;
  description: string;
  date: string;
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