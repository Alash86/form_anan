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

function App({ text, onOK }) {
  const sigCanvas = useRef(null);
  const [signature, setSignature] = useState('');

  const saveSignature = () => {
    setSignature(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
  };
  const [date, setDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);



  const [serverError, setServerError] = useState("")
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: {
        first: "",
        middle: "",
        last: "",
      },
      phone: "",
      email: "",
      password: "",
      image: {
        url: "",
        alt: "",
      },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
      },
      isBusiness: false,
    },
    validate(values) {
      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) {
        return null;
      }

      const errors = {};
      for (const detail of error.details) {
        const key = detail.path.join(".");
        errors[key] = detail.message;
      }
      return errors;
    },
    async onSubmit(values) {
      try {
        await signUp({ ...values });
        navigate("/sign-in");
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
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
          {...form.getFieldProps("name.first")}
          type="date"
          label="תאריך טיפול"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Input
          {...form.getFieldProps("name.middle")}
          type="text"
          label="שם פרטי"
          placeholder="שם פרטי"
          required

        />
        <Input
          {...form.getFieldProps("name.last")}
          type="text"
          label="שם משפחה"
          placeholder="שם משפחה"
          required

        />

        <Select

          type="select"
          label="חיוב"
          placeholder='מאשר בזאת חיוב אשראי'
          required
        >
          <option value="מאשר בזאת חיוב אשראי">מאשר בזאת חיוב אשראי</option>
        </Select>
        <Checkbox
          required
          {...form.getFieldProps("isBusiness")}
          type="checkbox"
          label="מדיניות ביטולים"

        />
        <Input

          type="text"
          label="שם החותם"
          required
        />
        <label className="form-label fs-6 fw-bold ">
          מהות הטיפול
          <span className="text-danger ms-1">*</span>
        </label>
        <div className="form-floating">

          <textarea style={{ height: 150 }} className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
          <label htmlFor="floatingTextarea"></label>
        </div>
        <InputTwo
          label="חתימה"
          required
        />





        <SignatureCanvas className="container" ref={sigCanvas} penColor='black' canvasProps={{ className: 'sigCanvas' }} />
        <button type="button" className='btn btn-secondary m-2' onClick={clearSignature}>Clear</button>
        <button type="button" className='btn btn-secondary' onClick={saveSignature}>Save</button>

        <Select label="האם ממשיך טיפולים"
        >
          <option value="">כן ממשיך</option>
          <option value="">סיים</option>
          <option value="">במעקב</option>

        </Select>
        <Input label="מועד הטיפול הבא" type="date">
        </Input>
        <Input label="שעת הטיפול הבא" type="time">
        </Input>
        <Input label="הערות" type="textarea">
        </Input>

        <Input

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
