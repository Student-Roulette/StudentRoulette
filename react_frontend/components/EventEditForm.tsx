import React, { Component } from "react";
import { StyleSheet, Text, Button } from "react-native";
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import TimePicker from '../components/TimePicker';



const PRIMARY_TAG_PLACEHOLDER: string[] = ["PT1","PT2","PT3"]; 
const SECONDARY_TAG_PLACEHOLDER: string[] = ["ST1","ST2","ST3"];

// Shape of form values
interface FormValues {
    EventName:string,
    GroupAffiliation:string[], //TODO: Create Group Type.
    Address:string,
    StartTime: Date,
    EndTime: Date,
    Description: string,
}

interface OtherProps {
    // In case we want to add other components to this form that are NOT fields.
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting, handleSubmit } = props;
    return (
      <Form>
        <Field type="text" name="EventName" placeholder="Event's Name"/>
        {touched.EventName && errors.EventName && <Text>{errors.EventName}</Text>}
  
        <Field as="select" name="GroupAffiliation">
            {props.initialValues.GroupAffiliation.map((val,index)=>{
                return(<option key={val}>{val}</option>)
            })}
        </Field>
        {touched.GroupAffiliation && errors.GroupAffiliation && <Text>{errors.GroupAffiliation}</Text>}

        <Field type="text" name="Address" placeholder="Location"/>
        {touched.Address && errors.Address && <Text>{errors.Address}</Text>}

        <Field component={TimePicker} name="StartTime" />
        {touched.StartTime && errors.StartTime && <Text>{errors.StartTime}</Text>}

        <Field component={TimePicker} name="EndTime" />
        {touched.EndTime && errors.EndTime && <Text>{errors.EndTime}</Text>}

        <Field as="textarea" name="Description" placeholder="Description of the Event"/>
        {touched.Description && errors.Description && <Text>{errors.Description}</Text>}

        <Field as="select" name="PrimaryTag" >
            {PRIMARY_TAG_PLACEHOLDER.map((val,index)=>{
                return(<option key={index}>{val}</option>)
            })}
        </Field>

        <Field as="select" name="PrimaryTag" >
            {SECONDARY_TAG_PLACEHOLDER.map((val,index)=>{
                return(<option key={index}>{val}</option>)
            })}
        </Field>
  
        <Button title="Submit" onPress={handleSubmit as any} disabled={isSubmitting}/>
      </Form>
    );
};

interface MyFormProps {
    initialEventName?:string,
    initialGroupAffiliation:string[], //TODO: Create Group Type.
    initialAddress?:string,
    initialStartTime?: Date,
    initialEndTime?: Date,
    initialDescription?: string,
}

const EventEditForm = withFormik<MyFormProps, FormValues>({
   // Transform outer props into form values
   mapPropsToValues: props => {
     return {
       EventName: props.initialEventName || '',
       GroupAffiliation: props.initialGroupAffiliation,
       Address: props.initialAddress || '',
       StartTime: props.initialStartTime || new Date(),
       EndTime: props.initialEndTime || new Date(),
       Description: props.initialDescription || '',
     };
   },
 
   // Add a custom validation function (this can be async too!)
   validate: (values: FormValues) => {
     let errors: FormikErrors<FormValues> = {};
     return errors;
   },
 
   handleSubmit: values => {
     // do submitting things
   },
})(InnerForm);

const styles = StyleSheet.create({
});

export default EventEditForm;