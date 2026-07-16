import { FormEvent } from 'react';

import { XMarkMini } from '@medusajs/icons';
import { useRouter } from 'next/navigation';

import Wrapper, { ControlledSearchBoxProps } from './Wrapper';

const ControlledSearchBox = ({
  inputRef,
  onChange,
  onReset,
  onSubmit,
  placeholder,
  value,
  ...props
}: ControlledSearchBoxProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (onSubmit) {
      onSubmit(event);
    }

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleReset = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    onReset(event);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      {...props}
      className="w-full"
    >
      <form
        action=""
        noValidate
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className="flex items-center justify-between text-white">
          <input
            ref={inputRef}
            data-testid="search-input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={placeholder}
            spellCheck={false}
            type="search"
            value={value}
            onChange={onChange}
            className="txt-compact-large placeholder:text-ui-fg-on-color h-6 flex-1 bg-transparent placeholder:transition-colors focus:outline-none"
          />
        </div>
      </form>
    </div>
  );
};

const SearchBox = () => {
  const router = useRouter();

  return (
    <Wrapper>
      {props => {
        return (
          <>
            <ControlledSearchBox {...props} />
          </>
        );
      }}
    </Wrapper>
  );
};

export default SearchBox;
