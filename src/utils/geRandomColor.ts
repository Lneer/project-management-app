const getRandomColor = () => {
  const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'geekblue',
    'purple',
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

export default getRandomColor;
