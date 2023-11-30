import './main.css';

import icon from './assets/icons/triangle.png';

let emptyIndex = -1;

let farFromX;
let farFromY;
let ctrlKey;

const clicked = (e) => {
  const ctx = document.getElementById('custom-menu');
  ctx.style.display = 'none';
  console.log(e.target === ctx);
  if (e.target === ctx) {
    create(e.clientX, e.clientY);
  }
  document.removeEventListener('click', clicked);
};

const create = (x, y) => {
  const memoList = JSON.parse(localStorage.getItem('memoList'));
  emptyIndex = memoList?.findIndex((f) => f === null);
  console.log(memoList);
  if (memoList) {
    if (emptyIndex > -1) {
      memoList[emptyIndex] = {
        x: x,
        y: y,
        title: '',
        content: '',
        width: 200,
        height: 225,
        toggle: false,
      };
    } else if (memoList) {
      memoList.push({
        x: x,
        y: y,
        title: '',
        content: '',
        width: 200,
        height: 225,
        toggle: false,
      });
    }
    localStorage.setItem('memoList', JSON.stringify(memoList));
  } else
    localStorage.setItem(
      'memoList',
      JSON.stringify([
        {
          x: x,
          y: y,
          title: '',
          content: '',
          width: 200,
          height: 225,
          toggle: false,
        },
      ]),
    );

  createMemo(x, y, '', '', 200, 225, false, emptyIndex);
};

const createMemo = (x, y, title, content, width, height, toggle, index) => {
  const memoSpace = document.getElementById('memo-space');
  const memoList = JSON.parse(localStorage.getItem('memoList'));

  const memo = document.createElement('div');
  memo.className = 'memo';
  memo.id = index === undefined ? 0 : index === -1 ? memoList.length - 1 : index;
  memo.style.top = y + 'px';
  memo.style.left = x + 'px';
  memo.style.width = width + 'px';
  memo.style.height = toggle ? '38px' : height + 'px';
  memo.draggable = true;
  memo.addEventListener('dragstart', (e) => {
    const left = e.target.style.left.slice(0, -2);
    const top = e.target.style.top.slice(0, -2);
    farFromX = e.clientX - left;
    farFromY = e.clientY - top;
    ctrlKey = e.ctrlKey;
  });
  memo.addEventListener('dragend', dragging, false);

  const memoTitle = document.createElement('input');
  memoTitle.className = 'memo-title';
  memoTitle.placeholder = '메모';
  memoTitle.value = title;
  memoTitle.style.width = 'calc(100% - 30px)';
  memoTitle.addEventListener(
    'input',
    (e) => {
      const memoList = JSON.parse(localStorage.getItem('memoList'));
      memoList[index].title = e.target.value;
      localStorage.setItem('memoList', JSON.stringify(memoList));
    },
    false,
  );

  const xButton = document.createElement('button');
  xButton.textContent = 'x';
  xButton.className = 'x-button';
  xButton.id = index === undefined ? 0 : index === -1 ? memoList.length - 1 : index;
  xButton.addEventListener('click', deleteMemo, false);
  const textInput = document.createElement('textarea');
  textInput.addEventListener(
    'input',
    (e) => {
      const memoList = JSON.parse(localStorage.getItem('memoList'));
      memoList[index].content = e.target.value;
      localStorage.setItem('memoList', JSON.stringify(memoList));
    },
    false,
  );
  textInput.className = 'text-input';
  textInput.textContent = content;

  const controlButton = document.createElement('img');
  if (toggle) controlButton.style.display = 'none';
  controlButton.addEventListener('drag', (e) => {
    memo.style.width =
      e.clientX - memo.style.left.slice(0, -2) - 10 > 60
        ? `${e.clientX - memo.style.left.slice(0, -2) - 10}px`
        : '60px';
    memo.style.height =
      e.clientY - memo.style.top.slice(0, -2) - 30 > 50 ? `${e.clientY - memo.style.top.slice(0, -2) - 30}px` : '50px';

    const memoList = JSON.parse(localStorage.getItem('memoList'));
    memoList[e.target.id] = {
      ...memoList[e.target.id],
      width: e.clientX - memo.style.left.slice(0, -2) - 10 > 60 ? e.clientX - memo.style.left.slice(0, -2) - 10 : 60,
      height: e.clientY - memo.style.top.slice(0, -2) - 30 > 50 ? e.clientY - memo.style.top.slice(0, -2) - 30 : 50,
    };
    localStorage.setItem('memoList', JSON.stringify(memoList));
  });
  controlButton.src = icon;
  controlButton.className = 'icon control-button';
  controlButton.id = index === undefined ? 0 : index === -1 ? memoList.length - 1 : index;

  const toggleButton = document.createElement('div');
  toggleButton.className = 'icon toggle-button';
  toggleButton.classList.add(toggle ? 'on' : 'off');
  toggleButton.id = index === undefined ? 0 : index === -1 ? memoList.length - 1 : index;
  toggleButton.addEventListener(
    'click',
    (e) => {
      const memoList = JSON.parse(localStorage.getItem('memoList'));
      e.target.classList.remove('on');
      e.target.classList.remove('off');
      e.target.classList.add(memoList[e.target.id].toggle ? 'off' : 'on');

      document.getElementById(e.target.id).style.height = memoList[e.target.id].toggle
        ? memoList[e.target.id].height + 'px'
        : '38px';
      document.getElementsByClassName('control-button')[e.target.id].style.display = memoList[e.target.id].toggle
        ? ''
        : 'none';

      memoList[e.target.id] = {
        ...memoList[e.target.id],
        toggle: !memoList[e.target.id].toggle,
      };
      localStorage.setItem('memoList', JSON.stringify(memoList));
    },
    false,
  );

  memo.appendChild(memoTitle);
  memo.appendChild(xButton);
  memo.appendChild(textInput);
  memo.appendChild(controlButton);
  memo.appendChild(toggleButton);

  memoSpace.appendChild(memo);
};
const deleteMemo = (e) => {
  const index = e.target.id;
  const memoList = JSON.parse(localStorage.getItem('memoList'));
  memoList[index] = null;
  localStorage.setItem('memoList', JSON.stringify(memoList));

  e.target.parentElement.remove();
};

const dragging = (e) => {
  if (e.target.classList.contains('control-button')) {
    return;
  }
  const index = e.target.id;
  const memoList = JSON.parse(localStorage.getItem('memoList'));
  if (!ctrlKey) {
    e.target.remove();
    memoList[index] = {
      ...memoList[index],
      x: e.clientX - farFromX < 0 ? 0 : e.clientX - farFromX,
      y: e.clientY - farFromY < 0 ? 0 : e.clientY - farFromY,
    };
    createMemo(
      e.clientX - farFromX < 0 ? 0 : e.clientX - farFromX,
      e.clientY - farFromY < 0 ? 0 : e.clientY - farFromY,
      memoList[index].title,
      memoList[index].content,
      memoList[index].width,
      memoList[index].height,
      memoList[index].toggle,
      index,
    );
  } else {
    const emptyIdx = memoList?.findIndex((f) => f === null);
    createMemo(
      e.clientX - farFromX < 0 ? 0 : e.clientX - farFromX,
      e.clientY - farFromY < 0 ? 0 : e.clientY - farFromY,
      memoList[index].title,
      memoList[index].content,
      memoList[index].width,
      memoList[index].height,
      memoList[index].toggle,
      emptyIdx > -1 ? emptyIdx : memoList.length,
    );
    if (emptyIdx > -1) {
      memoList[emptyIdx] = {
        ...memoList[index],
        x: e.clientX - farFromX < 0 ? 0 : e.clientX - farFromX,
        y: e.clientY - farFromY < 0 ? 0 : e.clientY - farFromY,
      };
    } else {
      memoList.push({
        ...memoList[index],
        x: e.clientX - farFromX < 0 ? 0 : e.clientX - farFromX,
        y: e.clientY - farFromY < 0 ? 0 : e.clientY - farFromY,
      });
    }
  }
  localStorage.setItem('memoList', JSON.stringify(memoList));
};

window.onload = () => {
  memoInit();
};
const memoInit = () => {
  console.log(123123);
  const memoSpace = document.getElementById('memo-space');
  const memoList = JSON.parse(localStorage.getItem('memoList'));
  const newList = [];
  let idx = 0;
  if (memoList) {
    for (let i = 0; i < memoList.length; i++) {
      if (memoList[i]) {
        createMemo(
          memoList[i].x,
          memoList[i].y,
          memoList[i].title,
          memoList[i].content,
          memoList[i].width,
          memoList[i].height,
          memoList[i].toggle,
          idx,
        );
        idx++;
        newList.push(memoList[i]);
      }
    }
    localStorage.setItem('memoList', JSON.stringify(newList));
  }

  //이벤트리스터 추가
  memoSpace.addEventListener('dragover', (e) => e.preventDefault());

  //우클릭 메뉴
  memoSpace.addEventListener(
    'contextmenu',
    (e) => {
      e.Handled = true;
      e.preventDefault();
      const ctx = document.getElementById('custom-menu');
      ctx.style.display = 'block';
      ctx.style.top = e.clientY + 'px';
      ctx.style.left = e.clientX + 'px';
      memoSpace.addEventListener('click', clicked, false);
      ctx.addEventListener('click', clicked, false);
    },
    false,
  );
  //더블클릭
  memoSpace.addEventListener(
    'dblclick',
    (e) => {
      create(e.clientX, e.clientY);
    },
    false,
  );
};
