export class FormValidations{

    static zipCodeValidator(shippingError: boolean) {
        if (shippingError) {
            return { invalidZipCode: true };
        }
        return null;
    }
}