import { useState, useRef } from 'react';
import './App.css';
import { useFormik } from "formik";
import Input from './assets/components/input';
import Checkbox from './assets/components/checkbox';
import Select from './assets/components/select';
import SignatureCanvas from 'react-signature-canvas';
import InputTwo from './assets/components/inputTwo';
import Logo from './assets/components/logo';
import Textarea from './assets/components/textarea';
import Selectcontinue from './assets/components/selectContinue';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from './assets/components/firebaseConfig';

function App() {
  const sigCanvas = useRef(null);
  const [signature, setSignature] = useState('');
  const formA = useRef();

  const saveSignature = async () => {
    const trimmedCanvas = sigCanvas.current.getTrimmedCanvas();
    const dataURL = trimmedCanvas.toDataURL('image/png', 0.3);
    const signatureRef = ref(storage, `signatures/signature_${Date.now()}.png`);

    try {
      await uploadString(signatureRef, dataURL, 'data_url');
      const downloadURL = await getDownloadURL(signatureRef);
      setSignature(downloadURL);
    } catch (error) {
      console.error("Error uploading signature: ", error);
      toast.error("שגיאה בהעלאת החתימה");
    }
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
    setSignature('');
  };

  const form = useFormik({
    initialValues: {
      date: new Date().toISOString().split('T')[0],
      first: "",
      last: "",
      continue: "כן ממשיך",
      debit: "מאשר בזאת חיוב אשראי",
      fullname: "",
      textarea: "",
      dateNext: "",
      time: "",
      notes: "",
      physioName: "",
      isAgree: false,
    },
    validate: (values) => {
      // Validation logic (if needed)
      return null;
    },
    onSubmit: async (values) => {
      values.signature = signature; // Add the signature URL to values
      values.isAgree = values.isAgree ? "אישר" : "לא אישר";

      try {
        await emailjs.send('service_1qgkwou', 'template_ertnyuj', values, {
          publicKey: '41DzTzBuJyXgmfZob',
        });
        toast.success("הטופס נשלח בהצלחה");
        clearSignature(); // Clear signature after sending
        form.resetForm(); // Optionally reset the form
      } catch (error) {
        console.error('FAILED...', error.text);
        toast.error("שגיאה בשליחת הטופס");
      }
    }
  });

  return (
    <div className='container shadow p-3 bg-body-tertiary rounded mt-5 mb-5'>
      <Logo />
      <div className='container text-box m-0'>
        <h3 className=''>טופס אישור ביצוע טיפולי המשך</h3>
        <span className='text-danger'>טופס החתמה זה נועד עבור המשך טיפולים. יש למלא את הטופס ולהחתים את המטופל מייד לאחר סיום הטיפול. במידה ונתקלת בבעיה בשליחת הטופס נא לצלם מסך ולהעביר ל sharkia90@gmail.com</span>
      </div>
      <form
        ref={formA}
        onSubmit={form.handleSubmit}
        className="gap-5 m-5 text-justify"
        noValidate
        autoComplete="off"
      >
        <Input {...form.getFieldProps("date")} type="date" label="תאריך טיפול" required />
        <Input {...form.getFieldProps("first")} type="text" label="שם פרטי" required />
        <Input {...form.getFieldProps("last")} type="text" label="שם משפחה" required />
        <Select {...form.getFieldProps("debit")} label="חיוב" required>
          <option value="מאשר בזאת חיוב אשראי">מאשר בזאת חיוב אשראי</option>
        </Select>
        <Checkbox {...form.getFieldProps("isAgree")} label="מדיניות ביטולים" required />
        <Input {...form.getFieldProps("fullname")} label="שם החותם" required />
        <Textarea {...form.getFieldProps("textarea")} label="מהות הטיפול" required />
        <InputTwo label="חתימה" required />
        <SignatureCanvas
          {...form.getFieldProps("signature")}
          className="container"
          ref={sigCanvas}
          penColor='black'
          canvasProps={{ className: 'sigCanvas' }}
          onEnd={saveSignature} // Automatically save the signature when drawing ends
        />
        <button type="button" className='btn btn-secondary m-2' onClick={clearSignature}>Clear</button>

        <Selectcontinue {...form.getFieldProps("continue")} label="האם ממשיך טיפולים" required />
        <Input {...form.getFieldProps("dateNext")} label="מועד הטיפול הבא" type="date" />
        <Input {...form.getFieldProps("time")} label="שעת הטיפול הבא" type="time" />
        <Input {...form.getFieldProps("notes")} label="הערות" type="textarea" />
        <Input {...form.getFieldProps("physioName")} label="שם הפיזיותרפיסט" required />

        <div className="my-2 p-3 mt-3">
          <button type="submit" className="btn btn-secondary fs-6">שליחה</button>
        </div>
      </form>
    </div>
  );
}

export default App;
