<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Results</title>
  <style>
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: Arial, sans-serif;
      text-align: center;
      margin: 20px;
    }
    h1 {
      font-size: 24px;
      color: #333;
    }
    h2 {
      margin-top: 40px;
      color: #555;
    }
    h3 {
      color: #666;
      margin-top: 30px;
    }
    table {
      width: 100%;
      max-width: 800px;
      border-collapse: collapse;
      margin-top: 20px;
      margin-bottom: 40px;
    }
    th, td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: center;
    }
    th {
      background-color: #f2f2f2;
    }
    .section-divider {
      width: 100%;
      max-width: 800px;
      border-top: 2px solid #eee;
      margin: 50px 0;
    }
  </style>
</head>
<body>
  <h1>Test Results</h1>

  <h2>Results by Ethnicity</h2>
  
  <!-- Black Ethnicity Results -->
  <h3>Black Ethnicity</h3>
  <table>
    <thead>
      <tr>
        <th>Audio File</th>
        <th>Name</th>
        <th>Congruency</th>
        <th>Key Pressed</th>
        <th>Correct</th>
        <th>Reaction Time (ms)</th>
      </tr>
    </thead>
    <tbody id="blackResultsTableBody">
      <!-- Rows will be populated here by JavaScript -->
    </tbody>
  </table>

  <!-- White Ethnicity Results -->
  <h3>White Ethnicity</h3>
  <table>
    <thead>
      <tr>
        <th>Audio File</th>
        <th>Name</th>
        <th>Congruency</th>
        <th>Key Pressed</th>
        <th>Correct</th>
        <th>Reaction Time (ms)</th>
      </tr>
    </thead>
    <tbody id="whiteResultsTableBody">
      <!-- Rows will be populated here by JavaScript -->
    </tbody>
  </table>

  <!-- Hispanic Ethnicity Results -->
  <h3>Hispanic Ethnicity</h3>
  <table>
    <thead>
      <tr>
        <th>Audio File</th>
        <th>Name</th>
        <th>Congruency</th>
        <th>Key Pressed</th>
        <th>Correct</th>
        <th>Reaction Time (ms)</th>
      </tr>
    </thead>
    <tbody id="hispanicResultsTableBody">
      <!-- Rows will be populated here by JavaScript -->
    </tbody>
  </table>

  <div class="section-divider"></div>

  <h2>Results by Block</h2>

  <!-- Block 1 Results (White vs Black) -->
  <h3>Block 1 (White vs Black)</h3>
  <table>
    <thead>
      <tr>
        <th>Audio File</th>
        <th>Name</th>
        <th>Ethnicity</th>
        <th>Key Pressed</th>
        <th>Correct</th>
        <th>Reaction Time (ms)</th>
      </tr>
    </thead>
    <tbody id="block1ResultsTableBody">
      <!-- Rows will be populated here by JavaScript -->
    </tbody>
  </table>

  <!-- Block 2 Results (Hispanic vs Black) -->
  <h3>Block 2 (Hispanic vs Black)</h3>
  <table>
    <thead>
      <tr>
        <th>Audio File</th>
        <th>Name</th>
        <th>Ethnicity</th>
        <th>Key Pressed</th>
        <th>Correct</th>
        <th>Reaction Time (ms)</th>
      </tr>
    </thead>
    <tbody id="block2ResultsTableBody">
      <!-- Rows will be populated here by JavaScript -->
    </tbody>
  </table>

  <!-- Block 3 Results (White vs Hispanic) -->
  <h3>Block 3 (White vs Hispanic)</h3>
  <table>
    <thead>
      <tr>
        <th>Audio File</th>
        <th>Name</th>
        <th>Ethnicity</th>
        <th>Key Pressed</th>
        <th>Correct</th>
        <th>Reaction Time (ms)</th>
      </tr>
    </thead>
    <tbody id="block3ResultsTableBody">
      <!-- Rows will be populated here by JavaScript -->
    </tbody>
  </table>

  <script>
    // Retrieve reaction data from localStorage
    const reactionData = JSON.parse(localStorage.getItem("reactionData")) || [];

    // Reference table body elements for each ethnicity
    const blackResultsTableBody = document.getElementById("blackResultsTableBody");
    const whiteResultsTableBody = document.getElementById("whiteResultsTableBody");
    const hispanicResultsTableBody = document.getElementById("hispanicResultsTableBody");

    // Reference table body elements for each block
    const block1ResultsTableBody = document.getElementById("block1ResultsTableBody");
    const block2ResultsTableBody = document.getElementById("block2ResultsTableBody");
    const block3ResultsTableBody = document.getElementById("block3ResultsTableBody");

    // Function to get readable key name
    function getKeyName(keyCode) {
      return keyCode === null ? 'None' : keyCode;
    }

    // Function to determine which block a trial belongs to
    function getBlockNumber(ethnicities) {
      if (ethnicities.includes("White") && ethnicities.includes("Black")) return 1;
      if (ethnicities.includes("Hispanic") && ethnicities.includes("Black")) return 2;
      if (ethnicities.includes("White") && ethnicities.includes("Hispanic")) return 3;
      return null;
    }

    // Track ethnicities present in each trial for block determination
    let currentTrialEthnicities = new Set();
    let currentBlockNumber = 1;

    // Populate results by ethnicity
    reactionData.forEach(entry => {
      if (!entry.rt) return; // Skip non-response trials

      const ethnicityRow = document.createElement("tr");
      ethnicityRow.innerHTML = `
        <td>${entry.stimulus || 'N/A'}</td>
        <td>${entry.name || 'N/A'}</td>
        <td>${entry.congruency || 'N/A'}</td>
        <td>${getKeyName(entry.response)}</td>
        <td>${entry.correct ? "Yes" : "No"}</td>
        <td>${entry.rt ? Math.round(entry.rt) : 'N/A'}</td>
      `;

      // Add to ethnicity tables
      if (entry.ethnicity === "Black") {
        blackResultsTableBody.appendChild(ethnicityRow.cloneNode(true));
      } else if (entry.ethnicity === "White") {
        whiteResultsTableBody.appendChild(ethnicityRow.cloneNode(true));
      } else if (entry.ethnicity === "Hispanic") {
        hispanicResultsTableBody.appendChild(ethnicityRow.cloneNode(true));
      }

      // Add to block tables
      const blockRow = document.createElement("tr");
      blockRow.innerHTML = `
        <td>${entry.stimulus || 'N/A'}</td>
        <td>${entry.name || 'N/A'}</td>
        <td>${entry.ethnicity || 'N/A'}</td>
        <td>${getKeyName(entry.response)}</td>
        <td>${entry.correct ? "Yes" : "No"}</td>
        <td>${entry.rt ? Math.round(entry.rt) : 'N/A'}</td>
      `;

      // Update current ethnicities
      currentTrialEthnicities.add(entry.ethnicity);
      
      // If we have two ethnicities, determine the block
      if (currentTrialEthnicities.size === 2) {
        currentBlockNumber = getBlockNumber([...currentTrialEthnicities]);
        currentTrialEthnicities.clear();
      }

      // Add to appropriate block table
      switch(currentBlockNumber) {
        case 1:
          block1ResultsTableBody.appendChild(blockRow);
          break;
        case 2:
          block2ResultsTableBody.appendChild(blockRow);
          break;
        case 3:
          block3ResultsTableBody.appendChild(blockRow);
          break;
      }
    });

    // Function to display "No data available" message
    function showNoDataMessage(tableBody, colspan) {
      if (tableBody.children.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="${colspan}">No data available</td></tr>`;
      }
    }

    // Check for empty tables and display messages
    showNoDataMessage(blackResultsTableBody, 6);
    showNoDataMessage(whiteResultsTableBody, 6);
    showNoDataMessage(hispanicResultsTableBody, 6);
    showNoDataMessage(block1ResultsTableBody, 6);
    showNoDataMessage(block2ResultsTableBody, 6);
    showNoDataMessage(block3ResultsTableBody, 6);
  </script>
<div style="margin-top: 40px; padding: 20px; background-color: #f9f9f9; border-radius: 8px; max-width: 800px">
  <h3 style="color: #444; margin-bottom: 15px">Speaker Reference Key</h3>
  <p style="line-height: 1.6; color: #666;">
    <strong>White Speakers:</strong> Speaker1, Speaker2<br>
    <strong>Black Speakers:</strong> Speaker3, Speaker4<br>
    <strong>Hispanic Speakers:</strong> Speaker5, Speaker6
  </p>
</div>
</body>
</html>
