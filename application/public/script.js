let formName;
let authorSelect;
let submitBtn;
let radioGroup;
let variables;

function toggleSlide(e) {
    e.preventDefault(); // Prevent link navigation
    const container = document.querySelector('.container');
    const importBtn = document.getElementById('importBtn');
    const panel = document.getElementById('selectionPanel');
    const buildBtn = document.getElementById('builder');
    const previewBtn = document.getElementById('preview');

    // Toggle the 'slide-left' class on the container
    container.classList.toggle('slide-left');

    // Hide the other buttons when sliding out
    buildBtn.classList.toggle('slide-out');
    previewBtn.classList.toggle('slide-out');

    // Are we sliding left now?
    const isSlideLeft = container.classList.contains('slide-left');

    // Highlight the Import/Export button if slid left
    if (isSlideLeft) {
        importBtn.classList.add('selected');
        // Clear the form when sliding in
        formName.value = '';
        authorSelect.selectedIndex = 0;
        // Reset radio buttons
        radioGroup.forEach(radio => {
            radio.checked = false;
        });
        // Hide the dropdown (only show on export)
        authorSelect.style.display = 'none';
        // Show the selection panel
        panel.classList.add('show');
    } else {
        importBtn.classList.remove('selected');
        // Hide the selection panel
        panel.classList.remove('show');
    }
    // Update the Save button state
    validateForm();
}

function toggleBearerKey() {
    const bearerInput = document.getElementById("bearer");
    const eyeIcon = document.getElementById("show-key");

    if (bearerInput.type === "password") {
        bearerInput.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        bearerInput.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}

async function setAuthors() {
    const users = await fetch("api/images", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(async response => await response.json()) || [];

    // Populate dropdown from fetched data
    users.forEach(userSvg => {
        const user = userSvg.replace('.svg', '');
        const name = user.split('_')[0];
        const id = user.split('_')[1];

        const option = document.createElement('option');
        option.value = id;
        option.textContent = name;
        authorSelect.appendChild(option);
    });
};

async function setSettings() {
    variables = await fetch("api/variables", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(async response => await response.json()) || {};

    const env = document.getElementById('env')
    const bearer = document.getElementById('bearer')
    
    env.value = variables.DMS;
    bearer.value = variables.BEARER;

    // Disable builder and preview buttons by toggling the .disabled class
    document.getElementById('builder').classList.toggle('disabled', variables.DMS == "" || variables.BEARER == "");
    document.getElementById('preview').classList.toggle('disabled', variables.DMS == "" || variables.BEARER == "");
}

// Show/hide author dropdown & enable/disable "Save" button
function validateForm() {
    let selectedMode = null;
    radioGroup.forEach(radio => {
        if (radio.checked) {
            selectedMode = radio.value;
        }
    });

    // If 'export' is selected, show the dropdown
    if (selectedMode === 'export') {
        authorSelect.style.display = 'inline-block';
    } else {
        authorSelect.style.display = 'none';
    }

    // Check if a name is entered
    const nameEntered = formName.value.trim().length > 0 && !formName.value.includes('\"') && !formName.value.includes('\'');

    // If 'export' is selected, require author; if 'import', skip
    const authorChosen = selectedMode === 'export'
        ? (authorSelect.value !== "")
        : true;

    // We also need a mode selected
    const modeSelected = !!selectedMode;

    // Enable if all conditions are met
    submitBtn.disabled = !(modeSelected && nameEntered && authorChosen);
}

// Check if the settings are changed and valid
function validateSettings() {
    const env = document.getElementById('env').value;
    const bearer = document.getElementById('bearer').value;

    // Check if the settings are valid
    const settingsValid = env && bearer;

    // Check if the settings are changed
    const settingsChanged = env !== variables.DMS || bearer !== variables.BEARER;

    // Enable the save button if the settings are valid and changed
    document.getElementById("save-button").disabled = !(settingsValid && settingsChanged);
}

async function submit() {
    const selectedMode = document.querySelector('input[name="mode"]:checked').value;
    const formName = document.getElementById('formName').value;
    const userId = document.getElementById('authorSelect').value;

    // Prepare the data to send
    const data = {
        mode: selectedMode,
        formName,
        userId
    };

    // Send the data to the server
    const response = await fetch('api/form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    // Handle the response
    if (response.ok) {
        if (selectedMode === 'export') {
            alert('Form exported successfully!');
        } else {
            alert('Form imported successfully!');
        }
    } else {
        if (selectedMode === 'export') {
            alert('Error exporting form!');
        } else {
            alert('Error importing form!');
        }
    }
}

async function save() {
    const env = document.getElementById('env').value;
    const bearer = document.getElementById('bearer').value;

    // Prepare the data to send
    const data = {
        DMS: env,
        BEARER: bearer
    };

    // Send the data to the server
    const response = await fetch('api/variables', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    // Handle the response
    if (response.ok) {
        alert('Settings saved successfully!');
        await setSettings();
        validateSettings();
    } else {
        alert('Error saving settings!');
    }
}

window.onload = function () {
    formName = document.getElementById('formName');
    authorSelect = document.getElementById('authorSelect');
    submitBtn = document.getElementById('submitBtn');
    radioGroup = document.querySelectorAll('input[name="mode"]');

    // Populate the settings
    setSettings();

    // Populate the author dropdown
    setAuthors();

    // Listen for changes on radios, text input, and select in the form
    radioGroup.forEach(radio => {
        radio.addEventListener('change', validateForm);
    });
    formName.addEventListener('input', validateForm);
    authorSelect.addEventListener('change', validateForm);

    // Listen for changes on the settings
    document.getElementById('env').addEventListener('input', validateSettings);
    document.getElementById('bearer').addEventListener('input', validateSettings);

    // Disable the buttons if the settings are not set
    document.getElementById('builder').addEventListener('click', (e) => {
        if (document.getElementById('builder').classList.contains('disabled')) {
            e.preventDefault();
            alert('Please set the DMS and Bearer Key in the settings');
        }
    });
    document.getElementById('preview').addEventListener('click', (e) => {
        if (document.getElementById('preview').classList.contains('disabled')) {
            e.preventDefault();
            alert('Please set the DMS and Bearer Key in the settings');
        }
    });
};