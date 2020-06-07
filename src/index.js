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

const init = {
  count: 0,
  prev: 0,
  symbol: undefined,
  flag: false,
};

function render(param = init) {
  const {
    count, prev, symbol, flag,
  } = param;
  console.log(param);
  function showNum(i) {
    if (count === 0) {
      render({
        ...param, count: i,
      });
    }
    if (flag === true) {
      render({
        ...param, count: i, flag: false,
      });
    }
    if (count !== 0 && flag !== true) {
      render({
        ...param, count: count * 10 + i,
      });
    }
  }

  function operator(currentSymbol) {
    const opFlag = { symbol: currentSymbol, flag: true };
    const opKeyObj = {
      '+': { count: prev + count, prev: prev + count, ...opFlag },
      '-': { count: prev - count, prev: prev - count, ...opFlag },
      '*': { count: prev * count, prev: prev * count, ...opFlag },
      '/': { count: prev / count, prev: prev / count, ...opFlag },
      '=': { count: prev, prev: 0, flag: false },
    };
    render(opKeyObj[symbol]);
  }

  function operation(currentSymbol) {
    if (!symbol) {
      render({
        ...param, prev: count, symbol: currentSymbol, flag: true,
      });
    }
    operator(currentSymbol);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{count}</p>
      <div>
        <p>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
              <button type="button" onClick={() => showNum(i)}>
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
              <button type="button" onClick={() => operation(i)}>
                {i}
              </button>
            ))
          }
        </p>
      </div>
    </div>

  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
