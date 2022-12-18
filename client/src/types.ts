export interface User {
  name: string
  email: string
  password: string
  created_at: string
  updated_at: string
  exp: number
}

export type Token = string

export interface Customer {
  customerId: string
  registrationTime: number
  email: string
  emailVerifiedTime: number
  name: string
  familyName: string
  givenName: string
  telephone: string
  telephoneVerifiedTime: number
  telephoneCountry: string
  location: {
    country: string
    postalCode: string
    latitude: number
    longitude: number
    addresseeName: string
    street1: string
    street2: string
    neighbourhood: string
    zone: string
    city: string
    region: string
    poBoxNumber: string
  }
}

export interface PaymentMethod {
  timestamp: number
  customerId: string
  paymentMethod: {
    methodType: string
    paymentMethodId: string
    instrumentId: string
    cardBin: string
    cardLastFour: string
    expiryMonth: number
    expiryYear: number
    eWallet: string
    nameOnCard: string
    billingAddress: {
      country: string
      postalCode: string
      latitude: number
      longitude: number
      addresseeName: string
      street1: string
      street2: string
      neighbourhood: string
      zone: string
      city: string
      region: string
      poBoxNumber: string
    }
    successfulRegistration: true
    registrationTime: number
    lastVerified: number
  }
}
