import React, { useState } from "react";

function TagInputBox() {
  const [tags, setTags] = useState([]); // 태그 목록을 저장하는 상태
  const [inputVisible, setInputVisible] = useState(true); // 입력 창의 가시성을 관리하는 상태

  const TagInput = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const newTag = e.target.value.trim(); // 입력된 태그
      setTags([...tags, newTag]); // 기존 태그 목록에 새로운 태그 추가
      setInputVisible(true);
      e.target.value = ""; // 입력 상자 초기화
    }
  };

  const TagDelete = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag); // 선택된 태그 제외한 새로운 태그 목록
    setTags(updatedTags); // 태그 목록 업데이트
  };

  return (
    <div>
      <div style={{ display: "flex", marginBottom: "5px" }}>
        <input
          type="text"
          name="inputbox"
          placeholder="태그를 입력하세요"
          onKeyDown={TagInput}
        />
      </div>

      {tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {tags.map((tag, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#f0f0f0",
                padding: "5px",
                borderRadius: "20px",
                margin: "5px",
              }}
            >
              {tag}
              <button name="buttons" onClick={() => TagDelete(tag)}>
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TagInputBox;
