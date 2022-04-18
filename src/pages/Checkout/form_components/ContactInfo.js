import React, { useEffect, useState } from "react";
import {
  Alert,
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from "reactstrap";
import Navbar from "../../../components/navbar/navbar";
import { db } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";
function ContactInfo({
  firstName,
  setFirstName,
  secondName,
  setSecondName,
  paymentMethod,
  setPaymentMethod,
  phone,
  setPhone,
  street,
  setStreet,
  city,
  setCity,
  county,
  setCounty,
  postalCode,
  setPostalCode,
  email,
  setEmail
}) {
  return (
    <Form className="container-fluid contact-info-container">
      <h2 className="mb-3">Informatii de Livrare</h2>

      <div>
        <FormGroup>
          <Input
            type="email"
            name="co_email"
            id="coContactEmail"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormGroup>
        <Row form>
          <Col md={12}>
            <FormGroup>
              <Input
                type="text"
                name="co_first_name"
                id="coFirstName"
                placeholder="Prenume"
                style={{ width: "100%" }}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Input
                type="text"
                name="co_last_name"
                id="coLastName"
                placeholder="Nume de familie"
                value={secondName}
                onChange={(e) => {
                  setSecondName(e.target.value);
                }}
              />
            </FormGroup>
          </Col>
          <FormGroup>
            <Input
              type="text"
              name="co_phone"
              id="coPhone"
              placeholder="Telefon"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </FormGroup>
        </Row>
        <FormGroup>
          <Input
            type="text"
            name="co_address"
            id="coAddress"
            placeholder="Strada si numarul"
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
            }}
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="text"
            name="co_city"
            id="coCity"
            placeholder="Oras"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup className="dropdown-container">
              <Label for="coState">Judet</Label>
              <Input
                type="text"
                name="co_judet"
                id="coJudet"
                placeholder="Judet"
                value={county}
                onChange={(e) => {
                  setCounty(e.target.value);
                }}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="coZip">Cod Postal</Label>
              <Input
                className="zip-input"
                type="text"
                name="co_zipcode"
                id="coZipCode"
                value={postalCode}
                onChange={(e) => {
                  setPostalCode(e.target.value);
                }}
                placeholder="Cod Postal"
              />
            </FormGroup>
            <FormGroup>
              <Label for="coZip">Platesc cu</Label>
              <Input id="PAYMENT" name="select" type="select" value={paymentMethod} onChange={(e) =>{setPaymentMethod(e.target.value)}}>
                <option value="card">card</option>
                <option value="ramburs">ramburs</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
      </div>
    </Form>
  );
}
export default ContactInfo;
