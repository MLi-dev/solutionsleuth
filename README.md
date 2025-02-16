# Solutionsleuth 

## Submitted by: Matthew Li

### Description: 

**Solutionsleuth** is a chat widget that is intended for users to find solutions to a question they have by entering a prompt, then answering a series of follow-up questions. Once all of the questions are answered, a solution will be generated providing recommendations to the user based on their given criteria. 

### Required Features

The following **required** functionality is completed:

- Uses Vue.JS:
    - [X] Uses Vue.JS and TailWindCss
- Enter Prompt:
    - [X] The user can fill in a text form asking their question.
- Question View:
  - [X] The user can toggle between viewing the questions in a single page or as a list.
- Editing:
  - [X] User can edit their responses to questions. 
- Question View:
  - [X] The user can toggle between viewing the questions in a single page or as a list.
- Question Types:
  - [X] Includes multiple choice (either as text or images), text box (user enters their response) or number-only answers.
- Solution Generation:
  - [X] The widget must allow the user to provide feedback on whether the answer was helpful or not (rated based on stars here).
- Logo:
  - [X] There should be a logo in the top left corner.
- Embeddedable in any Web page:
  - [X] Completed. Widget is bundled 
- Layout:
  - [X] The widget should feature a small logo on the top right-hand corner, and the admin should be able to easily change the logo.
    - Used browser local storage to store changes in background color, font color, font family, image used.   
  - [X] The widget must be responsive and fit different screen dimensions and sizes available on a webpage. 

  
**Admin Access**
- [X] Admin should be able to change: Font Color, Background Color, Font Family.
- [X] Admin should be able to choose a logo and change the widget's icon.

### How to run the project:
1. Clone from GitHub onto VSCode. 
2. Inside the project directory, run "npm install"
3. Run "npm run build"
4. Right click the host.html file, choose the "open with live server" option (need to install live server extension first though).
5. Host.html is a vanilla javascript html page, the widget is embedded in host.html. 


### Video Walkthroughs:
- Demonstration of entering prompt, entering questions, getting a solution back. Second gif is single page mode:
    -   ![VueWidgetDemoQuestions](https://github.com/user-attachments/assets/a50f70b2-6eb5-4017-9c72-ecce608eaaeb)
    -   ![SingleQuestionMode](https://github.com/user-attachments/assets/bc6a4df8-fa5c-473c-8c11-813a3091c0b3)

- Demonstration of Admin Privileges (changing font size, font color, background color, logo):
    -   ![AdminPrivileges](https://github.com/user-attachments/assets/5454039f-a9cc-4833-9909-460a085eac88)
- Demonstration of Dynamic Page Size:
    -   ![ChangeWindowSize](https://github.com/user-attachments/assets/f8660f53-5241-47f2-887d-f91eb27b5a93)



