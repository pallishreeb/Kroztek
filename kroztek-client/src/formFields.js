// formFields.js
const formFields = [
    { name: 'Efficiency', type: 'dropdown', options: ['IE2', 'IE3', 'IE4'], formType: 'LT Motors' },
    { name: 'Kilowatt', type: 'input', label: '75 to 750k', placeholder: 'Enter Kilowatt', formType: 'LT Motors' },
    { name: 'Ampere', type: 'input', label: 'Ampere', placeholder: 'Enter Kilowatt', formType: 'LT Motors' },
    { name: 'Rpm', type: 'dropdown', options: [3000, 1500, 1000, 750, 600], formType: 'LT Motors' },
    { name: 'Duty Cycle', type: 'dropdown', options: ["S1","S2","S3","S4"], formType: 'LT Motors' },
    { name: 'Voltage', type: 'dropdown',  options: [220,440], placeholder: 'Enter Kilowatt', formType: 'LT Motors' },
    { name: 'Insulation', type: 'dropdown', options: ["F","H"], formType: 'LT Motors' },
    { name: 'Frequency', type: 'dropdown', options: [50,60], formType: 'LT Motors' },
    { name: 'Winding', type: 'dropdown', options: ["VPI", "Non VPI"], formType: 'LT Motors' },
    { name: 'Terminal Box Position', type: 'dropdown', options: ["Top", "Left" , "Right"], formType: 'LT Motors' },
    { name: 'Cooling Method', type: 'dropdown', options: ["Standard", "Forced Cooling" ], formType: 'LT Motors' },
    { name: 'Drive Shaft Length', type: 'dropdown', options: ["Standard"], formType: 'LT Motors' },
    { name: 'Coupling Method ', type: 'dropdown', options: ["Belt Driven", "Direct Coupling"], formType: 'LT Motors' },
    { name: 'Starting Method', type: 'dropdown', options: ["DOL" , "Star Delta", "VFD", "Soft Starter"], formType: 'LT Motors' },
    { name: 'Mounting', type: 'dropdown', options: ["B3", "B5","B35"], formType: 'LT Motors' },
    { name: 'Application', type: 'input', label: 'Application', placeholder: 'Enter Kilowatt', formType: 'LT Motors' },
    // ... other fields for LT Motors
  
    // { name: 'SomeFieldForFan', type: 'input', label: 'Label for Fan', placeholder: 'Enter Fan Field', formType: 'Fan' },
    // ... other fields for Fan
  

    // ... other fields for Drive
  ];
  
  export default formFields;
  