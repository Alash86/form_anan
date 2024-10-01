import { useState } from 'react'
import './App.css'
import { useFormik } from "formik"
import Input from './assets/components/input'
import Checkbox from './assets/components/checkbox'
import schema from './assets/components/schema'
import { useEffect } from 'react'
import Select from './assets/components/select'
import SignatureCanvas from 'react-signature-canvas';
import { useRef } from 'react'
import InputTwo from './assets/components/inputTwo'
import Logo from './assets/components/logo'
import Textarea from './assets/components/textarea'
import Selectcontinue from './assets/components/selectContinue'

function App({ text, onOK }) {
  const sigCanvas = useRef(null);
  const [signature, setSignature] = useState('');

  const saveSignature = () => {
    setSignature(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
  };





  const [serverError, setServerError] = useState("")
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      date: new Date().toISOString().split('T')[0],
      name: {
        first: "",
        last: "",
      },
      continue: "כן ממשיך",
      debit: "מאשר בזאת חיוב אשראי",
      fullname: "",
      textarea: "",
      signature: "",
      dateNext: "",
      time: "",
      notes: "",
      physioName: "",
      isAgree: false,
    },
    validate(values) {

      return null;
    },


    async onSubmit(values) {
      values.signature = signature;
      console.log("Form is submitting");
      console.log(values);
    }
  });


  return (
    <div className='container shadow p-3  bg-body-tertiary rounded mt-5 mb-5'>
      <Logo />
      <div className='container  text-box m-0'>  <h3 className=''>טופס אישור ביצוע טיפולי המשך</h3>
        <span className='text-danger '>טופס החתמה זה נועד עבור המשך טיפולים. יש למלא את הטופס ולהחתים את המטופל מייד לאחר סיום הטיפול. במידה ונתקלת בבעיה בשליחת הטופס נא לצלם מסך ולהעביר ל sharkia90@gmail.com

        </span>
      </div>
      <form
        className="  gap-5 m-5 text-justify "
        onSubmit={form.handleSubmit}
        noValidate
        autoComplete="off"
      >
        {serverError && (
          <div className="alert alert-danger ">{serverError}</div>
        )}

        <Input
          {...form.getFieldProps("date")}
          type="date"
          label="תאריך טיפול"
          value={form.values.date}
          onChange={form.handleChange}
          required
        />
        <Input
          {...form.getFieldProps("name.first")}
          type="text"
          label="שם פרטי"
          value={form.values.name?.first}
          onChange={form.handleChange}
          placeholder="שם פרטי"
          required

        />
        <Input
          {...form.getFieldProps("name.last")}
          type="text"
          label="שם משפחה"
          value={form.values.name?.last}
          onChange={form.handleChange}
          placeholder="שם משפחה"
          required

        />

        <Select
          {...form.getFieldProps("debit")}
          type="select"
          value={form.values.debit}
          onChange={form.handleChange}
          label="חיוב"
          placeholder='מאשר בזאת חיוב אשראי'
          required
        >
          <option value="מאשר בזאת חיוב אשראי">מאשר בזאת חיוב אשראי</option>
        </Select>
        <Checkbox
          {...form.getFieldProps("isAgree")}
          value={form.values.isAgree}
          onChange={form.handleChange}
          required
          type="checkbox"
          label="מדיניות ביטולים"

        />
        <Input
          {...form.getFieldProps("fullname")}
          value={form.values.fullname}
          onChange={form.handleChange}
          type="text"
          label="שם החותם"
          required
        />
        <Textarea
          {...form.getFieldProps("textarea")}
          value={form.values.textarea}
          onChange={form.handleChange}
          label="מהות הטיפול"
          type="textarea"
          required
        />

        <InputTwo
          label="חתימה"
          required
          value={form.values.textarea}
          onChange={form.handleChange}
        />





        <SignatureCanvas
          {...form.getFieldProps("signature")}
          className="container" ref={sigCanvas} penColor='black' canvasProps={{ className: 'sigCanvas' }} />
        <button type="button" className='btn btn-secondary m-2' onClick={clearSignature}>Clear</button>
        <button type="button" className='btn btn-secondary' onClick={saveSignature}>Save</button>

        <Selectcontinue
          {...form.getFieldProps("continue")}
          label="האם ממשיך טיפולים"

          required
          value={form.values.textarea}
          onChange={form.handleChange}
        />



        <Input
          {...form.getFieldProps("dateNext")}
          label="מועד הטיפול הבא" type="date"

          value={form.values.dateNext}
          onChange={form.handleChange}>
        </Input>
        <Input
          {...form.getFieldProps("time")}
          label="שעת הטיפול הבא" type="time" value={form.values.time}
          onChange={form.handleChange}>
        </Input>
        <Input
          {...form.getFieldProps("notes")}
          label="הערות" type="textarea" value={form.values.notes}
          onChange={form.handleChange}>
        </Input>

        <Input
          {...form.getFieldProps("physioName")}
          value={form.values.physioName}
          onChange={form.handleChange}
          type="text"
          label="שם הפיזיותרפיסט"
          required
        />

        <div className="my-2 p-3 mt-3">
          <button
            type="submit"
            className="btn btn-secondary fs-6 "
          >
            שליחה
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
