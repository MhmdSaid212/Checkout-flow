This project is a fully responsive multi-step checkout flow built with React. The goal was to create a realistic checkout experience that accommodates a wide range of users by implementing comprehensive form validation, international phone number support, country selection, multiple payment methods, and a complete order review process.

The application includes personal information, address, payment, review, and confirmation steps, with user-friendly navigation, data persistence between steps, and accessibility-focused form handling. Special attention was given to validation rules and international compatibility to ensure the checkout process works reliably for users from different countries and regions.


This is the first step:

<img width="1890" height="816" alt="image" src="https://github.com/user-attachments/assets/7e45a4fa-6421-44d3-9980-82db83bf9dbd" />

The first step of the checkout flow collects the customer's contact information. Users are asked to provide their full name, email address, and phone number through a validated form designed to ensure accurate and properly formatted input. International phone number support is included to accommodate users from different countries. Alongside the form, an order summary provides a clear overview of the purchase details and total cost before proceeding to the next step of the checkout process.

This is the second step:

<img width="1920" height="1007" alt="screencapture-localhost-5173-2026-06-06-22_44_38" src="https://github.com/user-attachments/assets/ab4dfa05-6fa9-4fdb-a603-14586ed7de0b" />

The second step of the checkout flow collects the customer's shipping address information. Users are required to provide their street address, city, state or province, postal code, and country. The form includes validation rules to ensure that each field contains appropriate data and follows expected formatting standards. A searchable country selector with country flags improves usability and supports international users. Previously entered information is preserved when navigating between steps, creating a smooth and user-friendly checkout experience. The order summary remains visible throughout the process, allowing users to review purchase details while completing their address information.

This is the third step:

<img width="1766" height="843" alt="image" src="https://github.com/user-attachments/assets/5b990bbe-763e-4068-b6a7-2c349a11b510" />


The third step of the checkout flow handles payment information and provides users with multiple payment options. Customers can choose between Credit Card and PayPal through an intuitive payment method selector. For credit card payments, the form collects the cardholder's name, card number, expiration date, and CVV, with real-time validation and formatting to help prevent input errors. The system automatically detects and displays the card type based on the card number entered, improving user feedback and usability. Expiration dates are validated against the current date to ensure expired cards cannot be submitted. Throughout the process, users can navigate back to previous steps without losing their entered information, while the order summary remains visible for reference.

This is the fourth step:

<img width="1920" height="1112" alt="screencapture-localhost-5173-2026-06-06-22_47_57" src="https://github.com/user-attachments/assets/4886fd7c-6be8-4127-a2ee-abb7ee288c4e" />

The fourth step of the checkout flow serves as the order review stage, allowing users to verify all submitted information before completing their purchase. This page presents a clear summary of the customer's contact details, shipping address, and selected payment method in an organized format. Sensitive payment information is protected by masking the credit card number while still displaying the last few digits for identification. Users can review their entries, return to previous steps to make corrections if needed, or proceed with confidence to place their order. This final verification step helps reduce errors and improves the overall checkout experience.

This is the fifth step:

<img width="1920" height="925" alt="screencapture-localhost-5173-2026-06-06-22_49_32" src="https://github.com/user-attachments/assets/50bcc38f-b60d-40c5-abdf-a20bdfdcde88" />

The fifth and final step of the checkout flow is the order confirmation page. After successfully placing an order, users are presented with a confirmation message indicating that their purchase has been completed. The page displays a unique order number generated for the transaction and provides reassurance that the order has been received successfully. A clear success indicator and thank-you message enhance the user experience, while a call-to-action button allows users to continue shopping or start a new checkout session. This final step completes the checkout journey and provides users with immediate feedback that their order has been processed.



