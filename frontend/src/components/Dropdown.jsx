import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import clsx from 'clsx';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

const Dropdown = ({ selected, setSelected, options }) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <ListboxButton
        className={clsx(
          'relative block w-full rounded-lg bg-green-800/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-black',
          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
        )}
      >
        {selected.label}
        <ChevronDownIcon
          className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
          aria-hidden="true"
        />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className={clsx(
          'w-[var(--button-width)] rounded-xl border border-black/5 bg-green-500 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none z-10',
          'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
        )}
      >
        {options.map((option) => (
          <ListboxOption
            key={option.label}
            value={option}
            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
          >
            <CheckIcon className="invisible size-4 fill-green-600 group-data-[selected]:visible" />
            <div className="text-sm/6 text-black">{option.value}</div>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};

export default Dropdown;
