# Contact Form Specification

## Purpose

Contact form modal allowing visitors to send a message with their name, email, and message text. Includes field validation, loading states, success confirmation, and cancel behavior.

## Requirements

### Requirement: Form Fields

The system MUST display a contact form with four required fields.

#### Scenario: Form field layout

- GIVEN the contact form modal is open
- WHEN the form is displayed
- THEN the following fields are visible:
  - First Name (text input, required)
  - Last Name (text input, required)
  - Email (email input, required)
  - Message (textarea, required)
- AND on desktop the name fields appear in a 2-column layout
- AND on mobile the fields are stacked vertically
- AND a "Send message" submit button is visible

### Requirement: Form Validation

The system MUST validate form inputs before submission.

#### Scenario: Required field validation

- GIVEN one or more required fields are empty
- WHEN the user attempts to submit the form
- THEN HTML5 native validation prevents submission
- AND the browser highlights the invalid fields

#### Scenario: Email format validation

- GIVEN the email field contains a value
- WHEN the user attempts to submit
- THEN the browser validates the email format
- AND submission is blocked if the format is invalid

### Requirement: Form Submission

The system MUST handle form submission with a loading state and success confirmation.

#### Scenario: Successful submission

- GIVEN all fields are filled with valid data
- WHEN the user clicks "Send message"
- THEN the button changes to show a spinner with text "Sending..." and becomes disabled
- AND on success, a success screen appears with a checkmark icon and message "Message sent!"
- AND a secondary message "I'll reply as soon as possible." is displayed
- AND the modal auto-closes after 2 seconds

#### Scenario: Submission error

- GIVEN the form is submitted
- WHEN an error occurs during submission
- THEN the error is logged to the console
- AND the sending state resets (button returns to "Send message")

### Requirement: Cancel Behavior

The system MUST allow users to cancel the form without saving.

#### Scenario: User cancels form

- GIVEN the contact form is displayed with data entered
- WHEN the user clicks "Cancel"
- THEN the modal closes immediately
- AND all entered form data is discarded
- AND no submission is attempted
