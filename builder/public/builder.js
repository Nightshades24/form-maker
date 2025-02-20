let defaultForm;
let builder;

// Load form data and initialize builder
async function initializeBuilder() {
    const form = await getLoadedForm(); // Fetch the form data
    defaultForm = {
        components: form
    };

    // Assign builder to the global variable
    builder = await new Formio.builder(document.getElementById('dvf-form-builder'), defaultForm, {});

    builder.on('updateComponent', async () => {
        document.getElementById('save-form').disabled = !(await isFormModified());
    });
    builder.on('removeComponent', async () => {
        document.getElementById('save-form').disabled = !(await isFormModified());
    });
}

// Fetch the form data
async function getLoadedForm() {
    const response = await fetch('/api/form');
    return response.json();
}

// Save form function
async function saveForm() {
    if (!builder) {
        console.error("Builder is not initialized yet!");
        return;
    }
    
    await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(builder.schema.components)
    });

    // Disable the save button
    document.getElementById('save-form').disabled = true;

    // Update the default form
    defaultForm.components = builder.schema.components;

    console.log(defaultForm.components);
    console.log(await isFormModified());
}

async function isFormModified() {
    return true;

    if (!builder || !builder.schema) {
        console.error("Builder is not initialized yet!", builder);
        return;
    }

    // Compare the form data with the default form
    const form = builder.schema.components;
    const defaultComponents = await getLoadedForm();

    // Check if the form has been modified by loo

    console.log('Form not modified');

    return false;
}

// Initialize builder when the page loads
initializeBuilder();

// Attach event listeners
document.getElementById('save-form').addEventListener('click', saveForm);
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        saveForm();
    }
});
