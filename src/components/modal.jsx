import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function Modal({ show, onClose, title, children }) {
  return (
    <Transition {...{ show }} as={Fragment}>
      <Dialog as="div" className="relative z-50" {...{ onClose }}>
        <Transition.Child as={Fragment} enter="duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="container flex justify-center items-start min-h-screen py-32">
            <Transition.Child
              as={Fragment}
              enter="duration-300"
              enterFrom="opacity-0 -translate-y-8"
              enterTo="opacity-100 translate-y-0"
              leave="duration-300"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-8"
            >
              <Dialog.Panel className="bg-white rounded-3xl w-full max-w-xl">
                {title && <Dialog.Title className="text-2xl font-semibold text-center p-4 border-b border-black/10">{title}</Dialog.Title>}

                <div className="p-4">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
