/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

function defaultFunction(x, y) {
  return x || y;
}

const operationFunctions = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

function calculate(operator, accumulator, number) {
  return (operationFunctions[operator] || defaultFunction)(accumulator, number);
}

const initialState = {
  accumulator: 0,
  number: 0,
  operatoor: '',
};

function render({ accumulator, number, operator }) {
  function handleClickReset() {
    render(initialState);
  }

  function handleClickNumber(value) {
    render({
      accumulator,
      number: number * 10 + value,
      operator,
    });
  }

  function handleClickOperator(value) {
    render({
      accumulator: calculate(operator, accumulator, number),
      number: 0,
      operator: value,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number || accumulator}</p>
      <div>
        <p>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
              <button type="button" onClick={() => handleClickNumber(i)}>
                {i}
              </button>
            ))
          }
        </p>
      </div>
      <div>
        <p>
          {
            ['+', '-', '*', '/', '='].map((i) => (
              <button type="button" onClick={() => handleClickOperator(i)}>
                {i}
              </button>
            ))
          }
          <button type="button" onClick={handleClickReset}>
            reset
          </button>
        </p>
      </div>
    </div>

  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
