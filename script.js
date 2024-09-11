// Dữ liệu tạm thời lưu hộ khẩu và nhân khẩu
let households = [];

// Hàm thêm hộ khẩu mới
function addHousehold(householdId, ownerName, address) {
  const newHousehold = {
    id: householdId,
    owner: ownerName,
    address: address,
    people: [],
  };
  households.push(newHousehold);
  renderHouseholdList();
  updateHouseholdSelect();
}

// Hàm thêm nhân khẩu vào hộ khẩu
function addPersonToHousehold(householdId, personName, dob, relation) {
  const household = households.find((h) => h.id === householdId);
  if (household) {
    const newPerson = {
      name: personName,
      dob: dob,
      relation: relation,
    };
    household.people.push(newPerson);
    renderPersonList(householdId);
  }
}

// Render danh sách hộ khẩu
function renderHouseholdList() {
  const householdList = document.getElementById("household-list");
  householdList.innerHTML = "";
  households.forEach((h) => {
    const li = document.createElement("li");
    li.textContent = `Mã hộ khẩu: ${h.id}, Chủ hộ: ${h.owner}, Địa chỉ: ${h.address}`;
    li.addEventListener("click", () => renderPersonList(h.id));
    householdList.appendChild(li);
  });
}

// Render danh sách nhân khẩu
function renderPersonList(householdId) {
  const personList = document.getElementById("person-list");
  personList.innerHTML = "";
  const household = households.find((h) => h.id === householdId);
  if (household && household.people.length > 0) {
    household.people.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = `Họ tên: ${p.name}, Ngày sinh: ${p.dob}, Quan hệ với chủ hộ: ${p.relation}`;
      personList.appendChild(li);
    });
  } else {
    personList.textContent = "Chưa có nhân khẩu nào.";
  }
}

// Cập nhật danh sách hộ khẩu trong ô chọn hộ khẩu
function updateHouseholdSelect() {
  const householdSelect = document.getElementById("household-select");
  householdSelect.innerHTML = "";
  households.forEach((h) => {
    const option = document.createElement("option");
    option.value = h.id;
    option.textContent = h.owner;
    householdSelect.appendChild(option);
  });
}

// Xử lý sự kiện form thêm hộ khẩu
document
  .getElementById("add-household-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const householdId = document.getElementById("household-id").value;
    const householdOwner = document.getElementById("household-owner").value;
    const address = document.getElementById("address").value;
    addHousehold(householdId, householdOwner, address);
    e.target.reset();
  });

// Xử lý sự kiện form thêm nhân khẩu
document.getElementById("add-person-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const householdId = document.getElementById("household-select").value;
  const personName = document.getElementById("person-name").value;
  const dob = document.getElementById("dob").value;
  const relation = document.getElementById("relation").value;
  addPersonToHousehold(householdId, personName, dob, relation);
  e.target.reset();
});
