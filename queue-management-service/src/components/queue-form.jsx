import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import Input from './ui/Input.jsx';
import Select from './ui/Select.jsx';
import Button from './ui/Button.jsx';
import { useQueue } from '../context/queue-context.jsx';

export default function QueueForm() {
  const { add } = useQueue();
  const [name, setName] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !service.trim()) return;
    add({ name, service });
    setName("");
    setService("");
  };

  return (
    <div>
      <form className="queue-form" onSubmit={handleSubmit}>
        <h2>Add to Queue</h2>

        <div className="form-group">
          <Input id="queue-name-input" placeholder="Customer Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <Select value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">Select Service</option>
            <option value="Consultation">Consultation</option>
            <option value="Payment">Payment</option>
            <option value="Support">Support</option>
          </Select>
        </div>

        <Button type="submit">
          <FaUserPlus /> <span style={{ marginLeft: 8 }}>Add to Queue</span>
        </Button>
      </form>
    </div>
  );
}