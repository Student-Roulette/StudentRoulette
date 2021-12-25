import React, { Component } from "react";
import { StyleSheet, Text, Button } from "react-native";
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';

// Shape of form values
interface FormValues {
    EventName:string,
    GroupAffiliation:string, //TODO: Create Group Type.
    Address:string,
    StartTime: Date,
    EndTime: Date,
    Description: string,
    PrimaryTag: string, //TODO: Create Tag Type.
    SecondaryTag: string
}

interface OtherProps {
    // In case we want to add other components to this form that are NOT fields.
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting, handleSubmit } = props;
    return (
      <Form>
        <Field type="text" name="EventName" />
        {touched.EventName && errors.EventName && <Text>{errors.EventName}</Text>}
  
        <Field type="text" name="GroupAffiliation" />
        {touched.GroupAffiliation && errors.GroupAffiliation && <Text>{errors.GroupAffiliation}</Text>}
  
        <Button title="Submit" onPress={handleSubmit as any} disabled={isSubmitting}/>
      </Form>
    );
};

interface MyFormProps {
    initialEventName?:string,
    initialGroupAffiliation?:string, //TODO: Create Group Type.
    initialAddress?:string,
    initialStartTime?: Date,
    initialEndTime?: Date,
    initialDescription?: string,
    initialPrimaryTag?: string, //TODO: Create Tag Type.
    initialSecondaryTag?: string
}

const EventEditForm = withFormik<MyFormProps, FormValues>({
   // Transform outer props into form values
   mapPropsToValues: props => {
     return {
       EventName: props.initialEventName || '',
       GroupAffiliation: props.initialGroupAffiliation || '',
       Address: props.initialAddress || '',
       StartTime: props.initialStartTime || new Date(),
       EndTime: props.initialEndTime || new Date(),
       Description: props.initialDescription || '',
       PrimaryTag: props.initialPrimaryTag || '',
       SecondaryTag: props.initialSecondaryTag || ''
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