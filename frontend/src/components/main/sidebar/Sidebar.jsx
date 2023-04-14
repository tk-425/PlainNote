import './Sidebar.css';

const Sidebar = () => {
  const getContent = () => {
    const content = [];
    for (let i = 1; i <= 40; i++) {
      content.push(<div className='block flex flex-center'>Side {i}</div>);
    }

    return content;
  };

  return (
    <div className='main__sidebar'>
      <>{getContent()}</>
    </div>
  );
};

export default Sidebar;
