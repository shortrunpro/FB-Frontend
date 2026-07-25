import store_hours from './store-hours.json';

export const StoreHours = () => {
  return (
    <div>
      {/* <p className="heading-sm font-medium">Hours: </p> */}
      <ul className="max-w-[20rem]">
        {store_hours.map(hours => (
          <li
            key={hours.day}
            className="grid grid-cols-2 text-[14px] font-normal"
          >
            <span>{hours.day}</span>
            <span>{hours.hours}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
