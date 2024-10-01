export const RequiredInputRule = {
    required: 'Field is required.',
    pattern: {
        value: /^[A-Za-z]+$/,
        message: "Only alphabetic characters are allowed."
    },
    minLength: {
        value: 2,
        message: "Mininum character should be more than 2 characters.",
    },
};

export const EmailInputRule = {
    required: 'Field is required.',
    pattern: {
        value: /\S+@\S+\.\S+/,
        message: 'Invalid email address.',
    }
};

export const PasswordInputRule = {
    required: 'Field is required.',
    minLength: {
        value: 6,
        message: "Min password length is 6.",
    },
    pattern: {
        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
        message: "Password should be AlphaNumeric with Uppercase.",
    }
};

export const PasswordInputRuleNotRequired = {
    minLength: {
        value: 6,
        message: "Min password length is 6.",
    },
    pattern: {
        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
        message: "Password should be AlphaNumeric with Uppercase.",
    }
};

export const ConfirmPasswordInputRule = {
    required: 'Field is required.',
};

export const NameInputRule = {
    required: 'Field is required.',
    minLength: {
        value: 1,
        message: "Min firstname length is 1.",
    }
};
