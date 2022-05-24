import React, { useState, } from 'react';
import { Input, InputKinds, Button, ButtonKinds, ButtonStyles, ErrorBlock, } from '../../index';

export const EditText = ({ defaultInfo = '', infoType, labelName, placeholder,
  classNamePrefix, isEditable, validateFunc = undefined, onSave, }) => {

  const [editMode, setEditMode,] = useState(false);
  const [error, setError,] = useState({ [infoType]: [], });
  const [info, setInfo,] = useState(defaultInfo);

  return (
    <>
      {labelName ? <div className={`${classNamePrefix}-title`}>{labelName}:</div> : null}
      {!editMode ?
        <div className={classNamePrefix + '-' + infoType}>{defaultInfo}</div>
        : <Input
          kind={InputKinds.INFO}
          type='text'
          value={info}
          placeholder={placeholder}
          onChange={(e) => setInfo(e.target.value)}
        />
      }
      <div className={`${classNamePrefix}-errors`}>
        <ErrorBlock errorArr={error[infoType]} id={infoType} />
      </div>
      {isEditable ?
        <div className={`${classNamePrefix}-btns`}>
          {!editMode ?
            <Button
              kind={ButtonKinds.INFO}
              style={ButtonStyles.CANCEL}
              className={`${classNamePrefix}-edit`}
              onClick={(e) => setEditMode(true)}
            >
              Edit
            </Button>
            : <>
              <Button
                className={`${classNamePrefix}-save`}
                kind={ButtonKinds.INFO}
                style={ButtonStyles.SUCCESS}
                onClick={async (e) => {
                  let newErrors = validateFunc ? validateFunc(info) : { [infoType]: [], };
                  setError(newErrors);

                  if (newErrors[infoType].length === 0) {
                    await onSave(e, infoType, info);
                    setEditMode(false);
                  }
                }}
              >
                Save
              </Button>
              <Button
                className={`${classNamePrefix}-cancel`}
                kind={ButtonKinds.INFO}
                style={ButtonStyles.CANCEL}
                onClick={(e) => {
                  setError({ [infoType]: [], });
                  setEditMode(false);
                }}
              >
                Cancel
              </Button>
            </>}
        </div>
        : null
      }
    </>
  );
};
