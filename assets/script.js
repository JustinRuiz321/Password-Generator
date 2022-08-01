
function randomInt(min, max) {
    // if max ends up not being defined, it will result in the minimum amount
    if (!max) {
      max = min
      min = 0
    }
  
    let rand = Math.random()
    return Math.floor(min*(1 - rand) + rand*max)
  }
  
  // return a random entry from a list
  function getRandomIndex(list) {
    return list[randomInt(list.length)]
  }
  
  // prompt the user for a value, and a condition
  function promptUserForInputType(inputType, message, isValidCondition) {
    let userInput = window.prompt(message)
    let isValidType
  
    let inputObject = {
      canceled: userInput === null
    }
  
    // validate input for number type
    if (inputType === "number") {
      userInput = parseInt(userInput)
      isValidType = !isNaN(userInput)
    }
  
    // assign object fields
    inputObject.isValidType = isValidType
    inputObject.value = userInput
    inputObject.isValidCondition = isValidType && isValidCondition(userInput)
  
    return inputObject
  }
  
  // create a new passwordOption object
  function newPasswordOption(name, generator) {
    return {
      name: name,
      generate: generator,
    }
  }
  
  
  
  // Code for generating the password
  
  
  
  function getRandomSymbol() {
    return String.fromCharCode(randomInt(33, 47))
  }
  
  function getRandomNumber() {
    return String.fromCharCode(randomInt(48, 57))
  }
  
  function getRandomLetterLower() {
    return String.fromCharCode(randomInt(97, 122))
  }
  
  function getRandomLetterUpper() {
    return getRandomLetterLower().toUpperCase()
  }
  
  function generatePassword(minLength, maxLength) {
  
    
    let passwordLength
  
    // get the number of characters requested
    while (true) {
      passwordLength = promptUserForInputType(
        "number", 
        "Enter a password length (between " + minLength + " and " + maxLength + " characters)", 
        function(inputNumber) {
          return inputNumber >= minLength && inputNumber <= maxLength
        }
      )
  
      if (passwordLength.canceled) return
  
      // if anything but a number is selected
      if (!passwordLength.isValidType) {
        window.alert("Please enter a valid number")
  
      // if the number isn't between min and max, inform the user of the reason to not continue
      } else if (!passwordLength.isValidCondition) {
        window.alert("Password length must be between " + minLength + " and " + maxLength + " characters")
  
      // if there aren't any other invalidations, break the prompt loop
      } else {
        break
      }
    }
  
    // list of existing password options
    let passwordOptions = [
      newPasswordOption("uppercase letters", getRandomLetterUpper),
      newPasswordOption("lowercase letters", getRandomLetterLower),
      newPasswordOption("symbols", getRandomSymbol),
      newPasswordOption("numbers", getRandomNumber),
    ]
  
    // where the options would be stored
    let selectedPasswordOptions = []
  
    // iterate over all existing password options, prompting the user for each one
    for (let i = 0; i < passwordOptions.length; i++) {
      let option = passwordOptions[i]
      let userConfirmed = window.confirm("Would you like to include " + option.name + " in your password? (Okay = Yes, Cancel = No)")
  
      // push option to 'selectedPasswordOptions' array if the user confirms the option
      if (userConfirmed) selectedPasswordOptions.push(option)
    }
  
    // when no options are selected, create a random password
    if (selectedPasswordOptions.length === 0) {
      let randomOption = getRandomIndex(passwordOptions)
      window.alert("No specifications were given. Generating password with: " + randomOption.name)
      selectedPasswordOptions.push(randomOption)
    }
  
    // generating the password
    let passwordBuffer = ""
    for (let i = 0; i < passwordLength.value; i++) {
      passwordBuffer += getRandomIndex(selectedPasswordOptions).generate()
    }
  
   
    return passwordBuffer
  }
  
  // Showing the password
  function writePassword() {
    let password = generatePassword(8, 128);
    let passwordText = document.querySelector("#password");
  
    if (password) passwordText.value = password;
  }
  
  
  
  
  let generateBtn = document.querySelector("#generate");
  
  // add "click" event to the generate button
  generateBtn.addEventListener("click", writePassword);
  