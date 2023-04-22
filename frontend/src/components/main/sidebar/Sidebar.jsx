import './Sidebar.css';

const Sidebar = () => {
  const getContent = () => {
    const content = [];
    for (let i = 1; i <= 40; i++) {
      content.push(
        <div
          className='block flex item-center'
          key={i}
        >
          Side {i}
        </div>
      );
    }

    return content;
  };

  return (
    <div className='sidebar__container scroll-visibility'>
      <>{getContent()}</>
    </div>
  );
};

export default Sidebar;
