
import { Injectable, signal } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  isProcessing = signal(false);

  // In a real app, this would redirect to Stripe Checkout
  async processPayment(course: Course): Promise<{ success: boolean }> {
    this.isProcessing.set(true);
    console.log(`Initiating payment for ${course.title}...`);

    // Simulate API call to create a Stripe Checkout session
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Payment successful!');
    this.isProcessing.set(false);
    return { success: true };
  }
}
