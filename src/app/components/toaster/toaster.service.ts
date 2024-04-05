import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ToasterService {
    isSuccess: boolean = false;
    isError: boolean = false;
    message: string = '';
  
    showSuccess(message: string): void {        
      this.isSuccess = true;
      this.message = message;
  
      setTimeout(() => {
        this.isSuccess = false;
      }, 3000);
    }
  
    showError(message: string): void {
      this.isError = true;
      this.message = message;
      
      setTimeout(() => {
        this.isError = false;
      }, 3000);
    }

    closeSuccessToaster(): void {
        this.isSuccess = false;
    }

    closeErrorToaster(): void {
        this.isError = false;
    }
}