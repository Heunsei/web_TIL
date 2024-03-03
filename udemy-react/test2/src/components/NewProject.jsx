import React, { useRef } from 'react';
import Input from './Input';
import Modal from './Modal';

const NewProject = ({ onAdd, onCancle }) => {
    const modal = useRef()

    const titleRef = useRef()
    const descriptionRef = useRef()
    const dueDateRef = useRef()

    function handleSave() {
        const enteredTitle = titleRef.current.value
        const enteredDescription = descriptionRef.current.value
        const enteredDueDate = dueDateRef.current.value

        if (enteredTitle.trim() === '' ||
            enteredDescription.trim() === '' ||
            enteredDueDate.trim() === '') {
            modal.current.open()
            return;
        }

        // validation
        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate,
        })
    }

    return (
        <>
            <Modal ref={modal}
                buttonCaption="Okay"
            >
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">Please make sure you provide a valid information</p>
            </Modal >
            <div className='w-[35rem] mt-16'>
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button className="text-stone-800 hover:text-stone-950"
                            onClick={onCancle}>
                            cancle
                        </button>
                    </li>
                    <li>
                        <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:text-stone-950"
                            onClick={handleSave}>
                            save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input type="text" ref={titleRef} label="Title" />
                    <Input ref={descriptionRef} label="Description" isTextarea />
                    <Input type="date" ref={dueDateRef} label="Due Date" />
                </div>
            </div>
        </>
    );
};

export default NewProject;