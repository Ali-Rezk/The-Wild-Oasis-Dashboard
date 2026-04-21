import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <Row type="vertical">
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <CabinTable />
      <Button onClick={() => setShowCreateForm(!showCreateForm)}>
        Add new cabin
      </Button>
      {showCreateForm && <CreateCabinForm />}
    </Row>
  );
}

export default Cabins;
