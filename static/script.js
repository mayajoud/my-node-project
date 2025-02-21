let currentStep = 0;
const risks = [];
let stages = [];
let defenseLayers = [];
let currentStageIndex = 0;
let riskLocations = [];
let previousRisk = null;
let chains = {};
let currentChainId = 0;
let selectedLocation = {
  stages: [],
  layers: [],
  goals: [],
};
let isSavingToSameLocation = false;
const goals = [];
let goalResults = {};

document.getElementById("createProjectBtn").onclick = function () {
  document.getElementById("createProjectForm").classList.remove("hidden");
};
document.getElementById("editProjectBtn").addEventListener("click", () => {
  Swal.fire({
    title: "Select the type of modification",
    html: `
      <button class="swal-btn swal-current" 
        onclick="handleEditChoice('current')">
      Modify a current project 
      </button>
      <button class="swal-btn swal-previous" 
        onclick="handleEditChoice('previous')">
        Modify a previous project
      </button>
    `,
    showConfirmButton: false,
    customClass: {
      popup: "edit-choice-popup",
    },
  });
});
function handleEditChoice(choice) {
  Swal.close();

  if (choice === "current") {
    const currentProjectCode = localStorage.getItem("currentProjectCode");
    if (!currentProjectCode) {
      Swal.fire("Warning", "There is no project currently loaded!", "warning");
      return;
    }
    loadCurrentProjectToForm(); // تحميل البيانات الحالية للنموذج
  } else {
    editPreviousProject(); // الطريقة القديمة مع الـ prompt
  }
}
// تحميل بيانات المشروع الحالي إلى النموذج
function loadCurrentProjectToForm() {
  // جلب البيانات الحالية من localStorage
  const currentProject = {
    projectCode: localStorage.getItem("currentProjectCode") || "",
    projectName: localStorage.getItem("currentProjectName") || "",
    projectDescription: localStorage.getItem("currentProjectDescription") || "",
    stages: JSON.parse(localStorage.getItem("currentProjectStages")) || [],
    defenseLayers:
      JSON.parse(localStorage.getItem("currentProjectDefenseLayers")) || {},
    risks: JSON.parse(localStorage.getItem("currentProjectRisks")) || [],
  };

  // تعبئة حقول النموذج
  document.getElementById("projectCode").value = currentProject.projectCode;
  document.getElementById("projectName").value = currentProject.projectName;
  document.getElementById("projectDescription").value =
    currentProject.projectDescription;

  // تعبئة المتغيرات الأخرى
  stages = currentProject.stages;
  defenseLayers = currentProject.defenseLayers;
  risks = currentProject.risks;

  // إظهار النموذج
  document.getElementById("createProjectForm").classList.remove("hidden");
}
function editPreviousProject() {
  const projectCode = prompt("Enter previous project code:");
  if (!projectCode) {
    alert("Project code must be entered!");
    return;
  }

  fetch(`http://localhost:3000/projects/${projectCode}`)
    .then((response) => response.json())
    .then((project) => {
      // تخزين البيانات الحالية
      localStorage.setItem("currentProjectCode", project.projectCode);
      localStorage.setItem("currentProjectName", project.projectName);
      localStorage.setItem(
        "currentProjectDescription",
        project.projectDescription
      );
      localStorage.setItem("currentProjectStages", JSON.stringify(stages));
      localStorage.setItem(
        "currentProjectDefenseLayers",
        JSON.stringify(defenseLayers)
      );
      localStorage.setItem("currentProjectRisks", JSON.stringify(risks));

      console.log(
        "The current project has been updated and stored in localStorage:"
      );
      console.log(project);

      // تعبئة النموذج
      document.getElementById("projectCode").value = project.projectCode;
      document.getElementById("projectName").value = project.projectName;
      document.getElementById("projectDescription").value =
        project.projectDescription;
      document.getElementById("createProjectForm").classList.remove("hidden");
    })
    .catch((error) => {
      console.error(error);
      alert("Error fetching project data!");
    });
}
function updateProject() {
  const projectCode = document.getElementById("projectCode").value;
  const projectName = document.getElementById("projectName").value;
  const projectDescription =
    document.getElementById("projectDescription").value;

  // تخزين البيانات الحالية
  localStorage.setItem("currentProjectCode", projectCode);
  localStorage.setItem("currentProjectName", projectName);
  localStorage.setItem("currentProjectDescription", projectDescription);
  localStorage.setItem("currentProjectStages", JSON.stringify(stages));
  localStorage.setItem(
    "currentProjectDefenseLayers",
    JSON.stringify(defenseLayers)
  );
  localStorage.setItem("currentProjectRisks", JSON.stringify(risks));

  console.log(
    "The current project has been updated and stored in localStorage:"
  );
  console.log({
    projectCode,
    projectName,
    projectDescription,
    stages,
    defenseLayers,
    risks,
  });

  alert("The current project has been updated successfully!");
}

document.getElementById("closeModal").onclick = function () {
  document.getElementById("projectModal").classList.add("hidden");
};

function nextStep() {
  const steps = document.querySelectorAll(".form-step");
  if (currentStep < steps.length - 1) {
    steps[currentStep].classList.add("hidden");
    currentStep++;
    steps[currentStep].classList.remove("hidden");

    if (currentStep === steps.length - 1) {
      calculateRiskFactors();
    }
  }
}

function prevStep() {
  const steps = document.querySelectorAll(".form-step");
  if (currentStep > 0) {
    steps[currentStep].classList.add("hidden");
    currentStep--;
    steps[currentStep].classList.remove("hidden");
  }
}

function calculateRiskFactors() {
  console.log("Calculating risk factors...");
}
document.addEventListener("DOMContentLoaded", () => {
  const stagesContainer = document.getElementById("stagesContainer");
  const defenseLayerStep = document.getElementById("defenseLayerStep");
  const defenseLayersContainer = document.getElementById(
    "defenseLayersContainer"
  );
  const currentStageLabel = document.getElementById("currentStageLabel");
  const addLayerButton = document.getElementById("addLayerButton");
  const nextStageButton = document.getElementById("nextStageButton");

  if (
    !stagesContainer ||
    !defenseLayerStep ||
    !defenseLayersContainer ||
    !currentStageLabel ||
    !addLayerButton ||
    !nextStageButton
  ) {
    console.error("Missing required elements in the DOM.");
  } else {
    console.log("All elements are properly initialized.");
  }
  const currentProjectCode = localStorage.getItem("currentProjectCode");
  if (currentProjectCode) {
    stages = JSON.parse(localStorage.getItem("currentProjectStages")) || [];
    defenseLayers =
      JSON.parse(localStorage.getItem("currentProjectDefenseLayers")) || {};
    risks = JSON.parse(localStorage.getItem("currentProjectRisks")) || [];
  }
});

function generateStages() {
  const numStages = parseInt(document.getElementById("numStages").value);
  const stagesContainer = document.getElementById("stagesContainer");
  stagesContainer.innerHTML = "";

  if (numStages > 0) {
    stages = [];
    defenseLayers = {};
    currentStageIndex = 0;

    for (let i = 1; i <= numStages; i++) {
      const stageDiv = document.createElement("div");
      stageDiv.classList.add("stage");

      const stageLabel = document.createElement("label");
      stageLabel.innerText = `Stage ${i} Name:`;
      const stageInput = document.createElement("input");
      stageInput.type = "text";
      stageInput.placeholder = `Stage ${i}`;
      stageInput.required = true;

      stageInput.addEventListener("input", (e) => {
        const stageName = e.target.value.trim();
        stages[i - 1] = stageName;
        if (!defenseLayers[stageName]) {
          defenseLayers[stageName] = [];
        }
      });

      stageDiv.appendChild(stageLabel);
      stageDiv.appendChild(stageInput);
      stagesContainer.appendChild(stageDiv);
    }

    document.getElementById("defenseLayerStep").classList.remove("hidden");
    updateCurrentStageLabel();
  } else {
    alert("Please enter a valid number of stages.");
  }

  document.getElementById("riskQuestion").classList.remove("hidden");
}

function updateCurrentStageLabel() {
  if (stages[currentStageIndex]) {
    document.getElementById(
      "currentStageLabel"
    ).innerText = `Add Defense Layers for ${stages[currentStageIndex]}`;
  }
}

function addDefenseLayer() {
  const defenseLayerContainer = document.getElementById(
    "defenseLayersContainer"
  );
  const defenseLayerInput = document.createElement("input");
  defenseLayerInput.type = "text";
  defenseLayerInput.placeholder = `Enter Defense Layer for ${stages[currentStageIndex]}`;
  defenseLayerInput.required = true;

  defenseLayerContainer.appendChild(defenseLayerInput);

  defenseLayerInput.addEventListener("change", () => {
    const layerName = defenseLayerInput.value.trim();
    if (layerName) {
      if (!defenseLayers[currentStageIndex]) {
        defenseLayers[currentStageIndex] = [];
      }
      defenseLayers[currentStageIndex].push(layerName);
      console.log(
        `Added layer: ${layerName} to stage index: ${currentStageIndex}`
      );
    }
  });
}
function hidePreviousSteps() {
  document.getElementById("stagesContainer").classList.add("hidden");
  document.getElementById("defenseLayerStep").classList.add("hidden");
  const timeStagesElement = document.getElementById("timeStagesStep");
  if (timeStagesElement) {
    timeStagesElement.classList.add("hidden");
  } else {
    console.warn("Element with id 'timeStagesStep' not found.");
  }
}

function nextDefenseLayerStep() {
  const currentStageLayers = defenseLayers[currentStageIndex] || [];
  if (currentStageLayers.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Missing Data",
      text: "Please add at least one defense layer for the current stage before proceeding!",
    });
    return;
  }

  if (currentStageIndex < stages.length - 1) {
    currentStageIndex++;
    updateCurrentStageLabel();
    document.getElementById("defenseLayersContainer").innerHTML = "";
    console.log(`Moved to stage index: ${currentStageIndex}`);
  } else {
    Swal.fire({
      icon: "success",
      title: "All Stages Completed",
      text: "You have successfully entered defense layers for all stages!",
    });
    hidePreviousSteps();
    document.getElementById("riskQuestion").classList.remove("hidden");
    console.log("Final Defense Layers:", defenseLayers);
  }
}

document
  .getElementById("addLayerButton")
  .addEventListener("click", addDefenseLayer);

function finishStage() {
  const currentDefenseLayers = Array.from(
    document
      .getElementById("defenseLayersContainer")
      .querySelectorAll('input[type="text"]')
  )
    .map((input) => input.value.trim())
    .filter((value) => value !== "");

  if (currentDefenseLayers.length === 0) {
    Swal.fire({
      icon: "error",
      title: "No Layers Added",
      text: "Please add at least one defense layer before proceeding!",
    });
    return;
  }

  defenseLayers[currentStageIndex] = currentDefenseLayers;

  if (currentStageIndex < stages.length - 1) {
    currentStageIndex++;
    document.getElementById("defenseLayersContainer").innerHTML = "";
    nextDefenseLayerStep();
  } else {
    Swal.fire({
      icon: "success",
      title: "All Stages Completed",
      text: "You have successfully finished adding layers for all stages!",
    });
    askAddRisks();
  }
}

function askAddRisks() {
  const addRisksStep = document.getElementById("riskQuestion");
  addRisksStep.classList.remove("hidden");
}
document.getElementById("yesAddRisksBtn").onclick = function () {
  document.getElementById("riskQuestion").classList.add("hidden");
  document.getElementById("step9").classList.remove("hidden");
};

document.getElementById("noSkipRisksBtn").onclick = function () {
  alert("You chose to skip adding risks.");
  finishProject();
};
window.onload = function () {
  const calculateRFHButton = document.getElementById("calculateRFHButton");
  calculateRFHButton.disabled = true;
};
function addRisk() {
  const riskCode = document.getElementById("riskCode").value.trim();
  const riskName = document.getElementById("riskName").value.trim();
  const focusOfImpact = parseFloat(
    document.getElementById("focusOfImpact").value
  );
  const suddenness = parseFloat(document.getElementById("suddenness").value);
  const frequency = parseFloat(document.getElementById("frequency").value);
  const effectiveness = parseFloat(
    document.getElementById("effectiveness").value
  );

  if (
    !riskCode ||
    !riskName ||
    isNaN(focusOfImpact) ||
    isNaN(suddenness) ||
    isNaN(frequency) ||
    isNaN(effectiveness)
  ) {
    Swal.fire({
      icon: "error",
      title: "Invalid Input",
      text: "Please fill in all fields with valid data.",
    });
    return;
  }

  const rfh = focusOfImpact * suddenness * frequency * effectiveness;

  if (!selectedLocation.layers || selectedLocation.layers.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Invalid Layers",
      text: "Please select at least one layer.",
    });
    return;
  }

  showRelationModal(
    riskCode,
    riskName,
    focusOfImpact,
    suddenness,
    frequency,
    effectiveness,
    rfh
  );
}
function showRelationModal(
  riskCode,
  riskName,
  focusOfImpact,
  suddenness,
  frequency,
  effectiveness,
  rfh
) {
  if (!selectedLocation || !selectedLocation.layers) {
    console.warn("Selected location or layers are undefined.");
    Swal.fire(
      "Error",
      "Please select a valid location and layers before proceeding!",
      "error"
    );
    return;
  }

  // البحث عن المخاطر في نفس الطبقات المحددة
  const relatedRisks = risks
    .filter((risk) =>
      risk.location?.layers?.some((layer) =>
        selectedLocation.layers.includes(layer)
      )
    )
    .map((risk) => ({
      ...risk,
      label: `${risk.riskName} (${risk.riskCode}, RFH: ${risk.rfh.toFixed(2)})`,
    }));

  // إذا لم توجد مخاطر مرتبطة
  if (relatedRisks.length === 0) {
    addRiskToDatabase(
      riskCode,
      riskName,
      focusOfImpact,
      suddenness,
      frequency,
      effectiveness,
      rfh
    );
    return;
  }

  // إنشاء محتوى HTML للعلاقات المتعددة
  const htmlContent = `
    <div class="multi-relation-container">
      <h4 style="margin-bottom: 1rem;">Select Related Risks (${selectedLocation.layers.join(
        ", "
      )})</h4>
      
      <div class="relation-list" style="max-height: 300px; overflow-y: auto;">
        ${relatedRisks
          .map(
            (risk, index) => `
          <div class="relation-item" style="margin-bottom: 1rem; padding: 0.5rem; border-bottom: 1px solid #eee;">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <input 
                type="checkbox" 
                id="risk-${index}" 
                class="related-risk-checkbox"
                value="${risk.riskCode}"
                style="accent-color: #4CAF50;">
              
              <label for="risk-${index}" style="flex-grow: 1;">
                ${risk.label}
              </label>
              
              <select 
                class="relation-type" 
                data-risk="${risk.riskCode}"
                style="padding: 0.3rem; border-radius: 4px; border: 1px solid #ddd;"
                ${risk.riskCode === riskCode ? "disabled" : ""}>
                <option value="cumulative">Cumulative</option>
                <option value="maximum">Maximum Value</option>
                <option value="independent">Independent</option>
                <option value="custom">Custom Multiplier</option>
              </select>
            </div>
            
            <div class="custom-multiplier" data-risk="${risk.riskCode}" 
                 style="margin-top: 0.5rem; display: none;">
              <input 
                type="number" 
                step="0.1" 
                placeholder="Enter multiplier"
                style="width: 100%; padding: 0.2rem;">
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;

  // عرض النافذة التفاعلية
  Swal.fire({
    title: "Risk Relationships",
    html: htmlContent,
    width: "800px",
    showCancelButton: true,
    confirmButtonText: "Save Relationships",
    cancelButtonText: "Cancel",
    focusConfirm: false,
    didOpen: () => {
      // إضافة تفاعلية لحقول المضاعف المخصص
      document.querySelectorAll(".relation-type").forEach((select) => {
        select.addEventListener("change", (e) => {
          const multiplierDiv = document.querySelector(
            `.custom-multiplier[data-risk="${e.target.dataset.risk}"]`
          );
          multiplierDiv.style.display =
            e.target.value === "custom" ? "block" : "none";
        });
      });
    },
    preConfirm: () => {
      const selectedRelations = [];

      document
        .querySelectorAll(".related-risk-checkbox:checked")
        .forEach((checkbox) => {
          const riskCode = checkbox.value;
          const relationType = document.querySelector(
            `.relation-type[data-risk="${riskCode}"]`
          ).value;
          const customMultiplier = document.querySelector(
            `.custom-multiplier[data-risk="${riskCode}"] input`
          )?.value;

          selectedRelations.push({
            riskCode,
            relationType,
            customMultiplier: customMultiplier
              ? parseFloat(customMultiplier)
              : null,
          });
        });

      return selectedRelations;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const selectedRelations = result.value;
      let calculatedRFH = rfh;
      const chainId = ++currentChainId;

      // معالجة كل علاقة مختارة
      selectedRelations.forEach((relation) => {
        const relatedRisk = risks.find((r) => r.riskCode === relation.riskCode);

        if (!relatedRisk) return;

        // جمع كل المخاطر في نفس الطبقة
        const totalPreviousRFH = risks
          .filter(
            (r) =>
              r.riskCode !== riskCode && // استبعاد الخطر الحالي
              r.location?.layers?.some((l) =>
                selectedLocation.layers.includes(l)
              )
          )
          .reduce((sum, r) => sum + r.rfh, 0);

        switch (relation.relationType) {
          case "cumulative":
            calculatedRFH += totalPreviousRFH; // إضافة المجموع الكلي
            break;

          case "maximum":
            calculatedRFH = Math.max(calculatedRFH, relatedRisk.rfh);
            break;

          case "custom":
            if (relation.customMultiplier) {
              calculatedRFH += relatedRisk.rfh * relation.customMultiplier;
            }
            break;

          case "independent":
            // لا تغيير في القيمة
            break;
        }

        // تسجيل العلاقة في كلا الخطرين
        recordRelationship({
          source: riskCode,
          target: relation.riskCode,
          type: relation.relationType,
          chainId,
          customMultiplier: relation.customMultiplier,
        });
      });

      // إضافة الخطر مع العلاقات المحددة
      addRiskToDatabase(
        riskCode,
        riskName,
        focusOfImpact,
        suddenness,
        frequency,
        effectiveness,
        calculatedRFH,
        chainId,
        selectedRelations
      );
    }
  });
}

// دالة مساعدة لتسجيل العلاقات
function recordRelationship({
  source,
  target,
  type,
  chainId,
  customMultiplier,
}) {
  if (!chains[chainId]) {
    chains[chainId] = {
      members: [],
      relationships: [],
    };
  }

  // تسجيل العلاقة في السلسلة
  chains[chainId].members.push(source, target);
  chains[chainId].relationships.push({
    source,
    target,
    type,
    customMultiplier,
    timestamp: new Date().toISOString(),
  });

  // تحديث الخطرين المرتبطين
  [source, target].forEach((riskCode) => {
    const risk = risks.find((r) => r.riskCode === riskCode);
    if (risk) {
      risk.relationships = risk.relationships || [];
      risk.relationships.push({
        relatedRisk: riskCode === source ? target : source,
        type,
        chainId,
        customMultiplier,
      });
    }
  });
}

function addRiskToDatabase(
  riskCode,
  riskName,
  focusOfImpact,
  suddenness,
  frequency,
  effectiveness,
  rfh
) {
  const isFirstRisk = risks.length === 0;

  selectedLocation.layers.forEach((layer) => {
    const newRisk = {
      riskCode,
      riskName,
      focusOfImpact,
      suddenness,
      frequency,
      effectiveness,
      rfh,
      location: { ...selectedLocation },
      timeStage: selectedLocation.stages.join(", "),
      layer: layer, // تأكيد تعيين قيمة layer
    };
    risks.push(newRisk);
    calculateRFH(); // تحديث النتائج فور الإضافة
  });

  Swal.fire({
    title: "Risk Added Successfully",
    text: `Risk Name: ${riskName}\nRFH: ${rfh.toFixed(
      2
    )}\nLocation: ${JSON.stringify(selectedLocation)}\nLayer: ${layer}`,
    icon: "success",
    confirmButtonText: "OK",
  }).then(() => {
    resetFormFields();
  });
}

function resetFormFields() {
  document.getElementById("riskCode").value = "";
  document.getElementById("riskName").value = "";
  document.getElementById("focusOfImpact").value = "";
  document.getElementById("suddenness").value = "";
  document.getElementById("frequency").value = "";
  document.getElementById("effectiveness").value = "";
  document.getElementById("rfh").value = "";

  document.getElementById("addRiskButton").disabled = false;
}

function addRiskToChain(
  chainId,
  riskCode,
  riskName,
  rfh,
  relationType,
  relatedRiskCode
) {
  if (!chains[chainId]) {
    chains[chainId] = [];
  }

  selectedLocation.layers.forEach((layer) => {
    const relatedRisk = risks.find(
      (risk) => risk.layer === layer && risk.riskCode === relatedRiskCode
    );
    const isRelatedLayer = !!relatedRisk;

    const newRisk = {
      riskCode,
      riskName,
      rfh,
      relation: isRelatedLayer ? relationType : null,
      relatedRiskCode: isRelatedLayer ? relatedRiskCode : null,
      chainId: isRelatedLayer ? chainId : ++currentChainId,
      timeStage: selectedLocation.stages.join(", "),
      layer: layer,
    };

    risks.push(newRisk);

    if (!chains[newRisk.chainId]) {
      chains[newRisk.chainId] = [];
    }
    chains[newRisk.chainId].push(newRisk);

    Swal.fire({
      title: "Risk Added Successfully",
      text: `Risk Name: ${riskName}\nRFH: ${rfh.toFixed(2)}\nChain ID: ${
        newRisk.chainId
      }\nTime Stage: ${selectedLocation.stages.join(", ")}\nLayer: ${layer}`,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      resetFormFields();
    });
  });

  document.getElementById("addRiskButton").disabled = false;
  calculateRFH();
}

function updateChainId(riskCode, relatedRiskCode) {
  if (!chains[riskCode]) {
    chains[riskCode] = { chainId: ++currentChainId, relatedRisks: [] };
  }
  if (relatedRiskCode) {
    chains[riskCode].relatedRisks.push(relatedRiskCode);
  }
}

const noRelationRisks = [];
let maxRFH = 0;
function calculateRFHWithRelation(
  riskCode,
  riskName,
  focusOfImpact,
  suddenness,
  frequency,
  effectiveness,
  rfh,
  relation
) {
  const existingRisks = risks.filter(
    (risk) =>
      risk.location.stages.some((stage) =>
        selectedLocation.stages.includes(stage)
      ) &&
      risk.location.layers.some((layer) =>
        selectedLocation.layers.includes(layer)
      )
  );

  let newRFH = rfh;
  let message = "";

  if (existingRisks.length > 0) {
    switch (relation) {
      case "maximum":
        const sameLayerRisks = existingRisks.filter((risk) =>
          risk.location.layers.some((layer) =>
            selectedLocation.layers.includes(layer)
          )
        );

        const maxRFH = Math.max(...sameLayerRisks.map((risk) => risk.rfh), rfh);
        newRFH = maxRFH;
        message = `The maximum RFH value in the same layer is: ${newRFH.toFixed(
          2
        )}.`;
        break;

      case "cumulative":
        const totalRFH = existingRisks.reduce(
          (sum, risk) => sum + risk.rfh,
          rfh
        );
        newRFH = totalRFH;
        message = `Cumulative RFH value: ${newRFH.toFixed(2)}.`;
        break;

      case "no_relation":
        newRFH = rfh;
        message = `No relation: The RFH value for the new risk (${riskName}) is added independently as: ${newRFH.toFixed(
          2
        )}.`;
        break;
    }
  } else {
    newRFH = rfh;
    message = `The risk is added with RFH: ${newRFH.toFixed(2)}.`;
  }

  addRiskToDatabase(
    riskCode,
    riskName,
    focusOfImpact,
    suddenness,
    frequency,
    effectiveness,
    newRFH
  );

  Swal.fire({
    title: "Risk Added Successfully",
    text: `Risk Name: ${riskName}\nRFH: ${newRFH.toFixed(2)}\n\n${message}`,
    icon: "success",
    confirmButtonText: "OK",
  });

  Swal.close();
}
function displayNoRelationRisks() {
  if (noRelationRisks.length === 0) {
    console.log("No risks with no_relation to display.");
    return;
  }

  console.log("Risks with no_relation:");
  noRelationRisks.forEach((risk) => {
    console.log(
      `Risk Code: ${risk.riskCode}, Risk Name: ${
        risk.riskName
      }, RFH: ${risk.rfh.toFixed(2)}, Layer: ${risk.layer}`
    );
  });

  addRiskToDatabase(
    riskCode,
    riskName,
    focusOfImpact,
    suddenness,
    frequency,
    effectiveness,
    newRFH
  );
  calculateRFH();

  Swal.fire({
    title: "Risk Added Successfully",
    text: `Risk Name: ${riskName}\nRFH: ${newRFH.toFixed(2)}\n\n${message}`,
    icon: "success",
    confirmButtonText: "OK",
  });

  Swal.close();
}

function submitRisk() {
  const riskName = document.getElementById("riskName").value;
  const riskLocation = {
    stages: selectedLocation.stages,
    layers: selectedLocation.layers,
  };

  const newRisk = {
    riskName: riskName,
    location: riskLocation,
    rfh: 0,
  };

  addRisk(newRisk);
  Swal.fire({
    icon: "success",
    title: "Risk Added",
    text: `Risk ${riskName} added successfully.`,
  });
}

function openRiskLocationModal(isSameLocation = false) {
  const modal = document.getElementById("riskLocationModal");
  const modalRiskStagesContainer = document.getElementById(
    "modalRiskStagesContainer"
  );

  modalRiskStagesContainer.innerHTML = "";

  const errorMessage = document.createElement("div");
  errorMessage.id = "errorMessage";
  errorMessage.style.color = "red";
  errorMessage.style.display = "none";
  modalRiskStagesContainer.appendChild(errorMessage);

  if (stages.length > 0) {
    const stagesTitle = document.createElement("h3");
    stagesTitle.textContent = "Time Stages:";
    modalRiskStagesContainer.appendChild(stagesTitle);

    stages.forEach((stage, index) => {
      const checkboxWrapper = document.createElement("div");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `stage-${index}`;
      checkbox.value = stage;
      checkbox.name = "timeStages";

      const label = document.createElement("label");
      label.htmlFor = `stage-${index}`;
      label.textContent = stage;

      checkboxWrapper.appendChild(checkbox);
      checkboxWrapper.appendChild(label);
      modalRiskStagesContainer.appendChild(checkboxWrapper);
    });
  }

  if (Object.keys(defenseLayers).length > 0) {
    const layersTitle = document.createElement("h3");
    layersTitle.textContent = "Defense Layers:";
    modalRiskStagesContainer.appendChild(layersTitle);

    Object.keys(defenseLayers).forEach((stage) => {
      const layerList = defenseLayers[stage];
      if (layerList.length > 0) {
        const stageTitle = document.createElement("h4");
        stageTitle.textContent = `Layers for ${stages[stage]}:`;
        modalRiskStagesContainer.appendChild(stageTitle);

        layerList.forEach((layer, index) => {
          const checkboxWrapper = document.createElement("div");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = `layer-${stage}-${index}`;
          checkbox.value = layer;
          checkbox.name = "defenseLayers";

          checkbox.addEventListener("change", function () {
            const stageCheckbox = document.getElementById(`stage-${stage}`);
            if (this.checked && !stageCheckbox.checked) {
              errorMessage.textContent =
                "Please select the layer corresponding to the correct time stage.ً";
              errorMessage.style.display = "block";
              this.checked = false;
            } else {
              errorMessage.style.display = "none";
            }
          });

          const label = document.createElement("label");
          label.htmlFor = `layer-${stage}-${index}`;
          label.textContent = layer;

          checkboxWrapper.appendChild(checkbox);
          checkboxWrapper.appendChild(label);
          modalRiskStagesContainer.appendChild(checkboxWrapper);
        });
      }
    });
  }

  if (goals.length > 0) {
    const goalsTitle = document.createElement("h3");
    goalsTitle.textContent = "Goals:";
    modalRiskStagesContainer.appendChild(goalsTitle);

    goals.forEach((goal, index) => {
      const checkboxWrapper = document.createElement("div");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `goal-${index}`;
      checkbox.value = goal;
      checkbox.name = "goals";

      const label = document.createElement("label");
      label.htmlFor = `goal-${index}`;
      label.textContent = goal;

      checkboxWrapper.appendChild(checkbox);
      checkboxWrapper.appendChild(label);
      modalRiskStagesContainer.appendChild(checkboxWrapper);
    });
  }

  const sameLocationCheckboxWrapper = document.createElement("div");
  const sameLocationCheckbox = document.createElement("input");
  sameLocationCheckbox.type = "checkbox";
  sameLocationCheckbox.id = "sameLocationCheckbox";
  sameLocationCheckbox.checked = isSameLocation;

  const sameLocationLabel = document.createElement("label");
  sameLocationLabel.htmlFor = "sameLocationCheckbox";
  sameLocationLabel.textContent = "Save in the same location";

  sameLocationCheckboxWrapper.appendChild(sameLocationCheckbox);
  sameLocationCheckboxWrapper.appendChild(sameLocationLabel);
  modalRiskStagesContainer.appendChild(sameLocationCheckboxWrapper);

  sameLocationCheckbox.addEventListener("change", function () {
    isSavingToSameLocation = this.checked;
  });

  modal.classList.remove("hidden");
}
document.getElementById("saveRiskLocation").addEventListener("click", () => {
  const selectedStages = Array.from(
    document.querySelectorAll('input[name="timeStages"]:checked')
  ).map((checkbox) => checkbox.value);

  const selectedLayers = Array.from(
    document.querySelectorAll('input[name="defenseLayers"]:checked')
  ).map((checkbox) => checkbox.value);

  const selectedGoals = Array.from(
    document.querySelectorAll('input[name="goals"]:checked')
  ).map((checkbox) => checkbox.value);

  if (isSavingToSameLocation) {
    selectedLocation.stages.push(...selectedStages);
    selectedLocation.layers.push(...selectedLayers);
    selectedLocation.goals.push(...selectedGoals);
  } else {
    selectedLocation = {
      stages: selectedStages,
      layers: selectedLayers,
      goals: selectedGoals,
    };
  }

  Swal.fire({
    icon: "success",
    title: "Location Saved",
    text: `Selected Location:\nStages: ${selectedStages.join(
      ", "
    )}\nLayers: ${selectedLayers.join(", ")}\nGoals: ${selectedGoals.join(
      ", "
    )}`,
  });

  document.getElementById("riskLocationModal").classList.add("hidden");
});

document
  .getElementById("relationshipWithRisks")
  .addEventListener("change", function () {
    const relationship = this.value;

    document.getElementById("confirmRiskRelationship").style.display =
      "inline-block";
  });

document
  .getElementById("confirmRiskRelationship")
  .addEventListener("click", function () {
    const relationship = document.getElementById("relationshipWithRisks").value;
  });
function populateRiskLocationOptions() {
  const stagesContainer = document.getElementById("riskStagesContainer");

  if (!stagesContainer) {
    console.warn("Element with id 'riskStagesContainer' not found.");
    return;
  }

  stagesContainer.innerHTML = "";

  stages.forEach((stage, index) => {
    const stageDiv = document.createElement("div");
    const stageTitle = document.createElement("h4");
    stageTitle.innerText = stage;
    stageDiv.appendChild(stageTitle);

    defenseLayers[index]?.forEach((layer) => {
      const layerLabel = document.createElement("label");
      layerLabel.innerHTML = `
              <input type="checkbox" name="riskLayer" value="${stage}|${layer}">
              ${layer}
          `;
      stageDiv.appendChild(layerLabel);
    });

    stagesContainer.appendChild(stageDiv);
  });
}

document.getElementById("yesAddRisksBtn").onclick = function () {
  document.getElementById("riskQuestion").classList.add("hidden");
  document.getElementById("step9").classList.remove("hidden");
  populateRiskLocationOptions();
};

function collectRiskData() {
  const riskName = document.getElementById("riskName").value;
  const focusOfImpact = parseFloat(
    document.getElementById("focusOfImpact").value
  );
  const suddenness = parseFloat(document.getElementById("suddenness").value);
  const frequency = parseFloat(document.getElementById("frequency").value);
  const effectiveness = parseFloat(
    document.getElementById("effectiveness").value
  );

  const affectedStages = [];
  document
    .querySelectorAll('input[name="affectedStages"]:checked')
    .forEach((checkbox) => {
      affectedStages.push(checkbox.value);
    });

  if (
    !riskName ||
    isNaN(focusOfImpact) ||
    isNaN(suddenness) ||
    isNaN(frequency) ||
    isNaN(effectiveness) ||
    affectedStages.length === 0
  ) {
    alert("Please fill in all fields and select at least one affected stage.");
    return;
  }

  risks.push({
    riskName,
    focusOfImpact,
    suddenness,
    frequency,
    effectiveness,
    affectedStages,
  });

  alert("Risk added successfully!");
  console.log("Current Risks:", risks);
  calculateRFH();
  calculateRFV();
}

window.onload = function () {
  addGoal();
};
function addGoal() {
  const goalsContainer = document.getElementById("goalsContainer");
  const goalInput = document.createElement("input");
  goalInput.type = "text";
  goalInput.placeholder = "Enter Goal";
  goalInput.required = true;
  goalInput.classList.add("goal-input");

  goalsContainer.appendChild(goalInput);

  goalInput.addEventListener("blur", () => {
    const value = goalInput.value.trim();
    if (value && !goals.includes(value)) {
      goals.push(value);
      console.log("Goal added:", value);
    } else if (goals.includes(value)) {
      alert("This goal is already added.");
    }
  });
}

document.getElementById("goalSubmit").onclick = function () {
  const goals = document.querySelectorAll(".goal-input");
  if (Array.from(goals).some((input) => input.value.trim() === "")) {
    alert("Please ensure all goals are filled.");
    return;
  }
  document.getElementById("step4").classList.add("hidden");
  document.getElementById("timeStagesStep").classList.remove("hidden");
  nextStep();
};

function finishProject() {
  alert("Project has been completed successfully!");
}

function checkRiskCount() {
  const locationMap = risks.reduce((map, risk) => {
    if (!map[risk.riskLocation]) {
      map[risk.riskLocation] = 0;
    }
    map[risk.riskLocation]++;
    return map;
  }, {});

  const hasMultipleRisksInSameLocation = Object.values(locationMap).some(
    (count) => count >= 2
  );

  if (hasMultipleRisksInSameLocation) {
    document.getElementById("riskRelationsContainer").style.display = "block";
  } else {
    document.getElementById("riskRelationsContainer").style.display = "none";
  }
}
function submitProject() {
  const projectCode = document.getElementById("projectCode").value;
  const projectName = document.getElementById("projectName").value;
  const projectDescription =
    document.getElementById("projectDescription").value;

  // تخزين البيانات الحالية
  localStorage.setItem("currentProjectCode", projectCode);
  localStorage.setItem("currentProjectName", projectName);
  localStorage.setItem("currentProjectDescription", projectDescription);
  localStorage.setItem("currentProjectStages", JSON.stringify(stages));
  localStorage.setItem(
    "currentProjectDefenseLayers",
    JSON.stringify(defenseLayers)
  );
  localStorage.setItem("currentProjectRisks", JSON.stringify(risks));

  console.log("تم تخزين المشروع الحالي في localStorage:");
  console.log({
    projectCode,
    projectName,
    projectDescription,
    stages,
    defenseLayers,
    risks,
  });

  // إرسال البيانات إلى الخادم (إذا لزم الأمر)
  fetch("http://localhost:3000/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ projectCode, projectName, projectDescription }),
  })
    .then((response) => response.text())
    .then((data) => alert(data))
    .catch((err) => console.error(err));
}

function submitRisk() {
  const riskName = document.getElementById("riskName").value;
  const focusOfImpact = parseFloat(
    document.getElementById("focusOfImpact").value
  );
  const suddenness = parseFloat(document.getElementById("suddenness").value);
  const frequency = parseFloat(document.getElementById("frequency").value);
  const effectiveness = parseFloat(
    document.getElementById("effectiveness").value
  );

  fetch("http://localhost:3000/risks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      riskName,
      focusOfImpact,
      suddenness,
      frequency,
      effectiveness,
    }),
  })
    .then((response) => response.text())
    .then((data) => alert(data))
    .catch((err) => console.error(err));
}
function getRisksInLocation() {
  const risks = document.querySelectorAll("#risksList li");
  return risks;
}

document.getElementById("addDefenseLayerBtn").onclick = addDefenseLayer;
document.getElementById("addGoalBtn").onclick = addGoal;

function calculateRFH() {
  const results = {};
  const individualRisks = [];

  // معالجة السلاسل ذات العلاقات
  for (const [chainId, chainData] of Object.entries(chains)) {
    try {
      if (
        !chainData?.relationships ||
        !Array.isArray(chainData.relationships)
      ) {
        console.warn(`Invalid chain ${chainId} skipped`);
        continue;
      }

      let chainRFH = 0;
      let maxRFH = 0;
      let calculations = [];
      let horizontalPaths = [];
      let firstRiskInChain = null;

      chainData.relationships.forEach((relation, idx) => {
        const sourceRisk = risks.find((r) => r.riskCode === relation.source);
        const targetRisk = risks.find((r) => r.riskCode === relation.target);

        if (!sourceRisk || !targetRisk) {
          console.warn(`Missing risk in chain ${chainId}`);
          return;
        }

        if (idx === 0) firstRiskInChain = sourceRisk;

        switch (relation.type) {
          case "cumulative":
            chainRFH += targetRisk.rfh;
            calculations.push(
              `+ ${targetRisk.rfh.toFixed(2)} (${targetRisk.riskCode})`
            );
            horizontalPaths.push(`+ RF${targetRisk.riskCode}`);
            break;

          case "maximum":
            maxRFH = Math.max(maxRFH, targetRisk.rfh);
            calculations.push(
              `max(${maxRFH.toFixed(2)}, ${targetRisk.rfh.toFixed(2)})`
            );
            horizontalPaths.push(`max(RF${targetRisk.riskCode})`);
            break;

          case "custom":
            const multiplier = relation.customMultiplier || 1;
            const customValue = targetRisk.rfh * multiplier;
            chainRFH += customValue;
            calculations.push(`× ${multiplier} (${customValue.toFixed(2)})`);
            horizontalPaths.push(`× RF${targetRisk.riskCode}`);
            break;

          case "independent":
            calculations.push(`independent (${targetRisk.rfh.toFixed(2)})`);
            horizontalPaths.push(`RF${targetRisk.riskCode}`);
            break;
        }

        maxRFH = Math.max(maxRFH, targetRisk.rfh);
      });

      const finalValue = chainData.relationships.some((r) =>
        ["cumulative", "custom"].includes(r.type)
      )
        ? chainRFH + maxRFH
        : maxRFH;

      results[chainId] = {
        chainId,
        chainRFH,
        maxRFH,
        finalValue,
        calculations,
        horizontalPaths: horizontalPaths.join(" → "),
        layer: firstRiskInChain?.location?.layers?.[0] || "Unknown Layer",
        timeStage: firstRiskInChain?.timeStage || "Unknown Stage",
      };
    } catch (error) {
      console.error(`Error processing chain ${chainId}:`, error);
    }
  }

  // جمع المخاطر الفردية بدون علاقات
  risks.forEach((risk) => {
    const hasRelationships = Object.values(chains).some(
      (chain) => chain.members && chain.members.includes(risk.riskCode)
    );

    if (!hasRelationships) {
      individualRisks.push({
        riskCode: risk.riskCode,
        rfh: risk.rfh,
        layer: risk.location?.layers?.[0] || "Unknown",
        timeStage: risk.timeStage || "Unknown Stage",
      });
    }
  });

  displayRFHResults(results, individualRisks);
}

function displayRFHResults(results, individualRisks) {
  let output = "<h3>RFH Analysis Report</h3>";

  // عرض السلاسل ذات العلاقات
  const resultsByLayer = Object.values(results).reduce((acc, result) => {
    const layer = result.layer;
    if (!acc[layer]) acc[layer] = [];
    acc[layer].push(result);
    return acc;
  }, {});

  for (const [layer, layerResults] of Object.entries(resultsByLayer)) {
    output += `
      <div class="layer-section">
        <h4>Layer: ${layer}</h4>
        <table class="result-table">
          <thead>
            <tr>
              <th>Chain ID</th>
              <th>Time Stage</th>
              <th>Layer</th> <!-- تمت إضافة العمود هنا -->
              <th>Calculations</th>
              <th>Path</th>
              <th>Total RFH</th>
            </tr>
          </thead>
          <tbody>
            ${layerResults
              .map(
                (result) => `
              <tr>
                <td>${result.chainId}</td>
                <td>${result.timeStage}</td>
                <td>${result.layer}</td> <!-- عرض قيمة الـ Layer -->
                <td>
                  <div class="calculation-steps">
                    ${result.calculations
                      .map(
                        (step, i) => `
                      <div class="step">
                        <span class="step-index">${i + 1}.</span>
                        ${step}
                      </div>
                    `
                      )
                      .join("")}
                  </div>
                </td>
                <td>${result.horizontalPaths}</td>
                <td>${result.finalValue.toFixed(2)}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  // عرض المخاطر الفردية
  if (individualRisks.length > 0) {
    output += `
      <div class="layer-section">
        <h4>Individual Risks (No Relationships)</h4>
        <table class="result-table">
          <thead>
            <tr>
              <th>Risk Code</th>
              <th>Time Stage</th>
              <th>Layer</th>
              <th>RFH Value</th>
            </tr>
          </thead>
          <tbody>
            ${individualRisks
              .map(
                (risk) => `
              <tr>
                <td>${risk.riskCode}</td>
                <td>${risk.timeStage}</td>
                <td>${risk.layer}</td>
                <td>${risk.rfh.toFixed(2)}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  const styles = `
    <style>
      .result-table {
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;
      }
      .result-table th, .result-table td {
        padding: 12px;
        border: 1px solid #ddd;
        vertical-align: top;
      }
      .calculation-steps {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }
      .step {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.3rem;
        background: #f8f9fa;
        border-radius: 4px;
      }
      .step-index {
        font-weight: bold;
        color: #4CAF50;
      }
      .layer-section {
        margin-bottom: 2rem;
        background: #fff;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
    </style>
  `;

  Swal.fire({
    title: "Risk Analysis Results",
    html: styles + output,
    width: "90%",
    customClass: {
      container: "risk-results-container",
    },
  });
}
document.getElementById("addRiskButton").addEventListener("click", () => {
  const riskCode = document.getElementById("riskCode").value.trim();
  const riskName = document.getElementById("riskName").value.trim();
  const focusOfImpact = parseFloat(
    document.getElementById("focusOfImpact").value
  );
  const suddenness = parseFloat(document.getElementById("suddenness").value);
  const frequency = parseFloat(document.getElementById("frequency").value);
  const effectiveness = parseFloat(
    document.getElementById("effectiveness").value
  );

  if (
    !riskCode ||
    !riskName ||
    isNaN(focusOfImpact) ||
    isNaN(suddenness) ||
    isNaN(frequency) ||
    isNaN(effectiveness)
  ) {
    Swal.fire({
      icon: "error",
      title: "Invalid Input",
      text: "Please fill in all fields with valid data.",
    });
    return;
  }

  const rfh = focusOfImpact * suddenness * frequency * effectiveness;

  showRelationModal(
    riskCode,
    riskName,
    focusOfImpact,
    suddenness,
    frequency,
    effectiveness,
    rfh
  );
});

document
  .getElementById("calculateRFHButton")
  .addEventListener("click", calculateRFH);

document
  .getElementById("horizontalAnalysisButton")
  .addEventListener("click", calculateRFH);

document
  .getElementById("horizontalAnalysisButton")
  .addEventListener("click", calculateRFH);

function calculateRFV() {
  console.log("Starting RFV Calculation...");

  let goalResults = {};

  if (!risks || risks.length === 0) {
    console.warn("No risks available for RFV calculation.");
    return;
  }

  risks.forEach((risk, index) => {
    if (!risk || !risk.location) {
      console.warn(`Risk at index ${index} is missing location data.`);
      return;
    }

    // التحقق من وجود أهداف مرتبطة بالخطر
    if (
      !risk.location.goals ||
      !Array.isArray(risk.location.goals) ||
      risk.location.goals.length === 0
    ) {
      if (!goalResults["No Goals"]) {
        goalResults["No Goals"] = { totalRFV: 0, warnings: [] };
      }
      goalResults["No Goals"].warnings.push(
        `Risk "${risk.riskName}" (Code: ${risk.riskCode}) has no associated goals.`
      );
      return;
    }

    risk.location.goals.forEach((goal) => {
      console.log(`Processing goal: ${goal}`);

      if (!goalResults[goal]) {
        goalResults[goal] = { totalRFV: 0, warnings: [] };
      }

      if (isNaN(risk.rfh)) {
        goalResults[goal].warnings.push(
          `Invalid RFH value for risk "${risk.riskName}" (Code: ${risk.riskCode})`
        );
      } else {
        goalResults[goal].totalRFV += risk.rfh;
      }
    });
  });

  console.log("RFV Calculation Completed.");
  console.log("Final goalResults:", goalResults);

  displayRFVResults(goalResults);
}
function displayRFVResults(goalResults) {
  let results = `
    <h3>نتائج حساب RFV</h3>
    <table border="1" style="width:100%; border-collapse: collapse; text-align: left;">
      <thead>
        <tr>
          <th style="padding: 8px;">الهدف</th>
          <th style="padding: 8px;">إجمالي RFV</th>
          <th style="padding: 8px;">تحذيرات</th>
          <th style="padding: 8px;">إجراءات</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (const [goalName, data] of Object.entries(goalResults)) {
    const totalRFV = data?.totalRFV?.toFixed(2) || "⚠️ خطأ";
    const warnings = data?.warnings?.join("<br>") || "لا توجد تحذيرات";
    let actions = "";

    // إذا كان الهدف غير مربوط بأي خطر
    if (goalName === "No Goals" || data?.associatedRisks === 0) {
      actions = `
        <button 
          style="
            background: #4CAF50;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
          "
          onclick="linkGoalsToRisks('${riskCode}')"  // تأكد من تمرير riskCode الصحيح هنا
        >
          ربط الأهداف
        </button>
      `;
    }

    results += `
      <tr>
        <td style="padding: 8px;">${goalName}</td>
        <td style="padding: 8px;">${totalRFV}</td>
        <td style="padding: 8px;">${warnings}</td>
        <td style="padding: 8px;">${actions}</td>
      </tr>
    `;
  }

  results += `</tbody></table>`;

  Swal.fire({
    title: "نتائج حساب RFV",
    html: results,
    icon: "info",
    width: "80%",
  });
}
function linkGoalsToRisks(riskCode) {
  console.log("Searching for risk with code:", riskCode); // تصحيح الأخطاء
  console.log("Current risks:", risks); // تصحيح الأخطاء

  // البحث عن الخطر باستخدام riskCode
  const currentRisk = risks.find((r) => r.riskCode === riskCode);

  if (!currentRisk) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: `لم يتم العثور على الخطر المحدد (الكود: ${riskCode}).`,
    });
    return;
  }

  console.log("Found risk:", currentRisk); // تصحيح الأخطاء

  // الحصول على الأهداف غير المرتبطة بالخطر الحالي
  const unlinkedGoals = goals.filter(
    (goal) => !currentRisk.location?.goals?.includes(goal)
  );

  if (unlinkedGoals.length === 0) {
    Swal.fire({
      icon: "info",
      title: "لا توجد أهداف غير مرتبطة",
      text: "جميع الأهداف مرتبطة بالفعل بهذا الخطر.",
    });
    return;
  }

  // إنشاء قائمة بالأهداف غير المرتبطة
  const goalOptions = unlinkedGoals
    .map((goal) => `<option value="${goal}">${goal}</option>`)
    .join("");

  // عرض نافذة الربط
  Swal.fire({
    title: `ربط الأهداف بالخطر ${currentRisk.riskName}`,
    html: `
      <select id="goalSelect" class="swal2-select" style="width: 100%; padding: 8px;">
        ${goalOptions}
      </select>
    `,
    showCancelButton: true,
    confirmButtonText: "ربط",
    cancelButtonText: "إلغاء",
    focusConfirm: false,
    preConfirm: () => {
      const selectedGoal = document.getElementById("goalSelect").value;
      return selectedGoal;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const selectedGoal = result.value;

      // تحديث بيانات الخطر
      if (!currentRisk.location.goals) {
        currentRisk.location.goals = [];
      }
      currentRisk.location.goals.push(selectedGoal);

      // تحديث localStorage
      localStorage.setItem("currentProjectRisks", JSON.stringify(risks));

      // إعادة حساب RFV
      calculateRFV();

      // عرض رسالة نجاح
      Swal.fire({
        icon: "success",
        title: "تم الربط بنجاح",
        text: `تم ربط الهدف "${selectedGoal}" بالخطر ${currentRisk.riskName}`,
      });
    }
  });
}

function exportToCSV() {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Goal,Total RFV,Warnings\n";

  for (const [goalName, data] of Object.entries(goalResults)) {
    let totalRFV =
      data && typeof data.totalRFV === "number"
        ? data.totalRFV.toFixed(2)
        : "Error";
    let warnings =
      data.warnings && data.warnings.length > 0
        ? data.warnings.join("; ")
        : "No warnings";
    csvContent += `${goalName},${totalRFV},${warnings}\n`;
  }

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "rfv_results.csv");
  document.body.appendChild(link);
  link.click();
}
document
  .getElementById("analyzeVerticalButton")
  .addEventListener("click", calculateRFV);
document
  .getElementById("calculateRFHButton")
  .addEventListener("click", calculateRFH);

document
  .getElementById("horizontalAnalysisButton")
  .addEventListener("click", calculateRFH);

document.getElementById("addDefenseLayerBtn").onclick = addDefenseLayer;

document.getElementById("addGoalBtn").onclick = addGoal;

const calculateRFHButton = document.getElementById("calculateRFHButton");
if (calculateRFHButton) {
  calculateRFHButton.addEventListener("click", calculateRFH);
}

function calculateRiskFactors() {
  console.log("Calculating risk factors...");
}

document.getElementById("addRiskButton").addEventListener("click", addRisk);
document
  .getElementById("calculateRFHButton")
  .addEventListener("click", calculateRFH);
document
  .getElementById("analyzeVerticalButton")
  .addEventListener("click", calculateRFV);
document.getElementById("addDefenseLayerBtn").onclick = addDefenseLayer;
document.getElementById("addGoalBtn").onclick = addGoal;
document
  .getElementById("horizontalAnalysisButton")
  .addEventListener("click", calculateRFH);
