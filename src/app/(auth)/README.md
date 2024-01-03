## Authentication

Welcome to the auth module, this module serves to provide authentication for users of the application, and as such contains sub modules such as login, register, and verify. The folder structure is done in such a way that those \_components, \_actions, or \_hooks that are common to sub modules exist on the top. While sub modules like login, ... contain \_components, \_schemas, etc. that are specific to them. The sub modules include:

- Login: This contains the page for login, as well as the \_components that make up that page, it also contains validation \_schemas that will be used for form validation as well as validation for api/server actions.
- register: This is similar to login, it contains register page and the necessary \_components, \_schemas, \_actions, ... etc.

\*\*\* Each module also contains tests for the various components
