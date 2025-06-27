import type { IconType } from "react-icons";

const FormTabs = ({ Icon, onClick }: {
  Icon: IconType;
  onClick: () => void;
}) => {
  return (
    <div className='flex items-center p-1'>
      <Icon size={18} onClick={onClick} />
    </div>
  );
};

export default FormTabs;