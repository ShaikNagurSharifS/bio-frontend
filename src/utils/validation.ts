// Validation utilities for form fields

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
    if (!email) {
        return { isValid: false, error: 'Email is required' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Invalid email format' };
    }
    return { isValid: true };
};

// Phone number validation (international format)
export const validatePhone = (phone: string): ValidationResult => {
    if (!phone) {
        return { isValid: false, error: 'Phone number is required' };
    }
    // Remove all non-numeric characters
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
        return { isValid: false, error: 'Invalid phone number (10-15 digits required)' };
    }
    return { isValid: true };
};

// Password strength validation
export const validatePassword = (password: string): ValidationResult => {
    if (!password) {
        return { isValid: false, error: 'Password is required' };
    }
    if (password.length < 8) {
        return { isValid: false, error: 'Password must be at least 8 characters' };
    }
    if (!/[A-Z]/.test(password)) {
        return { isValid: false, error: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
        return { isValid: false, error: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
        return { isValid: false, error: 'Password must contain at least one number' };
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
        return { isValid: false, error: 'Password must contain at least one special character' };
    }
    return { isValid: true };
};

// Password strength checker (returns strength level)
export const getPasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong' | 'very-strong'; score: number } => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score++;
    if (password.length >= 16) score++;

    if (score <= 2) return { strength: 'weak', score };
    if (score <= 3) return { strength: 'medium', score };
    if (score <= 4) return { strength: 'strong', score };
    return { strength: 'very-strong', score };
};

// Name validation
export const validateName = (name: string): ValidationResult => {
    if (!name) {
        return { isValid: false, error: 'Name is required' };
    }
    if (name.length < 2) {
        return { isValid: false, error: 'Name must be at least 2 characters' };
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
        return { isValid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
    }
    return { isValid: true };
};

// Date of birth validation (must be 18+)
export const validateDateOfBirth = (dob: string): ValidationResult => {
    if (!dob) {
        return { isValid: false, error: 'Date of birth is required' };
    }
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        if (age - 1 < 18) {
            return { isValid: false, error: 'You must be at least 18 years old' };
        }
    } else if (age < 18) {
        return { isValid: false, error: 'You must be at least 18 years old' };
    }

    return { isValid: true };
};

// SSN/National ID validation (basic format check)
export const validateSSN = (ssn: string): ValidationResult => {
    if (!ssn) {
        return { isValid: false, error: 'SSN/National ID is required' };
    }
    const cleanSSN = ssn.replace(/\D/g, '');
    if (cleanSSN.length < 9 || cleanSSN.length > 12) {
        return { isValid: false, error: 'Invalid SSN/National ID format' };
    }
    return { isValid: true };
};

// Postal/ZIP code validation
export const validatePostalCode = (code: string, country: string = 'US'): ValidationResult => {
    if (!code) {
        return { isValid: false, error: 'Postal code is required' };
    }

    if (country === 'US') {
        if (!/^\d{5}(-\d{4})?$/.test(code)) {
            return { isValid: false, error: 'Invalid US ZIP code (e.g., 12345 or 12345-6789)' };
        }
    } else if (country === 'CA') {
        if (!/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(code)) {
            return { isValid: false, error: 'Invalid Canadian postal code (e.g., A1A 1A1)' };
        }
    } else {
        // Generic validation
        if (code.length < 3 || code.length > 10) {
            return { isValid: false, error: 'Invalid postal code' };
        }
    }

    return { isValid: true };
};

// Credit card number validation (Luhn algorithm)
export const validateCreditCard = (cardNumber: string): ValidationResult => {
    if (!cardNumber) {
        return { isValid: false, error: 'Card number is required' };
    }

    const cleanNumber = cardNumber.replace(/\D/g, '');

    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
        return { isValid: false, error: 'Invalid card number length' };
    }

    // Luhn algorithm
    let sum = 0;
    let isEven = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanNumber[i]);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    if (sum % 10 !== 0) {
        return { isValid: false, error: 'Invalid card number' };
    }

    return { isValid: true };
};

// Address validation
export const validateAddress = (address: string): ValidationResult => {
    if (!address) {
        return { isValid: false, error: 'Address is required' };
    }
    if (address.length < 5) {
        return { isValid: false, error: 'Address must be at least 5 characters' };
    }
    return { isValid: true };
};

// City validation
export const validateCity = (city: string): ValidationResult => {
    if (!city) {
        return { isValid: false, error: 'City is required' };
    }
    if (city.length < 2) {
        return { isValid: false, error: 'City must be at least 2 characters' };
    }
    if (!/^[a-zA-Z\s'-]+$/.test(city)) {
        return { isValid: false, error: 'City can only contain letters, spaces, and hyphens' };
    }
    return { isValid: true };
};

// Required field validation
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
    if (!value || value.trim() === '') {
        return { isValid: false, error: `${fieldName} is required` };
    }
    return { isValid: true };
};

// Terms acceptance validation
export const validateTermsAcceptance = (accepted: boolean): ValidationResult => {
    if (!accepted) {
        return { isValid: false, error: 'You must accept the terms and conditions' };
    }
    return { isValid: true };
};
