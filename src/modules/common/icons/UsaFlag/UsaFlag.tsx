import ReactCountryFlag from 'react-country-flag';

interface UsaFlagProps {
  size?: string;
}
export const UsaFlag = ({ size = '1rem' }: UsaFlagProps) => {
  return (
    <div>
      <ReactCountryFlag
        countryCode="US"
        aria-label="United States"
        style={{
          fontSize: '16px',
          lineHeight: '24px'
        }}
      />
    </div>
  );
};
