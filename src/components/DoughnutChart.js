import React, { useState, useRef } from "react";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const App = () => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedData, setSelectedData] = useState("");

  const labelsInputRef = useRef(null);

  const handleInputChange = (e) => {
    e.preventDefault();
    const inputLabels = e.target.labels.value.split(",");
    const inputData = e.target.data.value.split(",");

    const duplicateLabels = inputLabels.filter((label) =>
      labels.includes(label)
    );
    const invalidData = inputData.filter(
      (value) => isNaN(value) || Number(value) > 100
    );
    if (labelsInputRef.current.value === "") {
      alert("개발 스택 입력 또는 수치를 변경하세요.");
      return;
    }
    if (duplicateLabels.length > 0) {
      alert(`중복된 개발 스택이 있습니다: ${duplicateLabels.join(", ")}`);
      return;
    }
    if (inputData.length === 0) {
      alert(`수치를 입력하세요.`);
      return;
    }
    if (invalidData.length > 0) {
      alert(`입력 수치가 100을 초과했습니다.`);
      return;
    }

    const newData = inputData.map((value) => Number(value));
    setLabels((prevLabels) => [...prevLabels, ...inputLabels]);
    setData((prevData) => [...prevData, ...newData]);

    labelsInputRef.current.focus();
    e.target.labels.value = ""; // 입력 필드 초기화
    e.target.data.value = ""; // 입력 필드 초기화
  };

  const handleEdit = (label) => {
    const index = labels.indexOf(label);
    if (index !== -1) {
      setSelectedLabel(labels[index]);
      setSelectedData(data[index]);
    }
  };

  const handleUpdate = () => {
    const index = labels.indexOf(selectedLabel);
    if (index !== -1) {
      const updatedLabels = [...labels];
      const updatedData = [...data];
      updatedLabels[index] = selectedLabel;
      updatedData[index] = selectedData;
      setLabels(updatedLabels);
      setData(updatedData);
      setSelectedLabel("");
      setSelectedData("");
    }
  };

  const handleDelete = (label) => {
    const index = labels.indexOf(label);
    if (index !== -1) {
      const updatedLabels = [...labels];
      const updatedData = [...data];
      updatedLabels.splice(index, 1);
      updatedData.splice(index, 1);
      setLabels(updatedLabels);
      setData(updatedData);
    }
  };

  const colors = [
    // 보라 계열
    "#D8BFD8",
    "#DDA0DD",
    // 흰색 계열
    "#F5FFFA",
    "#F0FFF0",
    // 노랑 계열
    "#FFFFE0",
    "#FFFACD",
    // 검정 계열
    "#DCDCDC",
    "#D3D3D3",
    // 분홍 계열
    "#FFB5C5",
    "#FFC0CB",
    // 파랑 계열
    "#87CEFA",
    "#B0E0E6",
    // 남색 계열
    "#B0E2FF",
    "#87CEFF",
    // 초록 계열
    "#98FB98",
    "#90EE90",
    // 주황 계열
    "#FFA500",
    "#FF7F50",
    // 빨강 계열
    "#FFC0CB",
    "#FFB6C1",
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "개발 스택",
        backgroundColor: labels.map((_, i) => colors[i % 20]),
        data: data,
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "center",
        labels: {
          boxHeight: 10,
          font: {
            size: 12,
          },
        },
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
      },
    },
  };

  return (
    <div className="main-container">
      <form onSubmit={handleInputChange}>
        <div>
          <label>
            {" "}
            <span>*</span> 개발 스택{" "}
          </label>
          <input type="text" name="labels" ref={labelsInputRef} />
        </div>
        <div>
          <label>
            {" "}
            <span>*</span> 수치{" "}
          </label>
          <input type="text" name="data" />
        </div>
        <div className="submit">
          <button type="submit" name="buttons">
            추가
          </button>
        </div>
        <div>
          {labels.map((label, index) => (
            <div key={label}>
              {label}: {data[index]}
              <button name="buttons" onClick={() => handleEdit(label)}>
                수정
              </button>
              <button name="buttons" onClick={() => handleDelete(label)}>
                삭제
              </button>
            </div>
          ))}
        </div>
        {selectedLabel && (
          <div>
            <input
              type="text"
              value={selectedLabel}
              onChange={(e) => setSelectedLabel(e.target.value)}
            />
            <input
              type="text"
              value={selectedData}
              onChange={(e) => setSelectedData(e.target.value)}
            />
            <button name="buttons" onClick={handleUpdate}>
              수정 완료
            </button>
          </div>
        )}
      </form>
      <div className="charts" style={{ maxWidth: "30%", margin: "10 auto" }}>
        {/* maxWidth와 margin 속성을 사용하여 그래프의 최대 너비를 지정하고 가운데 정렬 */}
        <div
          style={{
            paddingLeft: "50%",
            width: "100%",
            height: "300px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Bar 차트의 크기를 수동으로 지정 */}
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default App;
