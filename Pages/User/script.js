document.getElementById("select-all").addEventListener("change", function() {
    const checkboxes = document.querySelectorAll("tbody input[type='checkbox']");
    checkboxes.forEach(checkbox => checkbox.checked = this.checked);
  });

  document.querySelector(".filter").addEventListener("input", function() {
    const filterText = this.value.toLowerCase();
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach(row => {
      const cells = Array.from(row.querySelectorAll("td")).map(cell => cell.textContent.toLowerCase());
      row.style.display = cells.some(cell => cell.includes(filterText)) ? "" : "none";
    });
  });