import { useState, useEffect } from 'react';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { contactService } from '../../services/contactService';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await contactService.getAll();
      setMessages(data);
    } catch (error) {
      toast.error('Failed to fetch messages');
    }
  };

  const handleViewMessage = async (message) => {
    setSelectedMessage(message);
    setModalOpen(true);
    if (!message.read) {
      try {
        await contactService.update(message._id, { read: true });
        fetchMessages();
      } catch (error) {
        console.error('Failed to mark as read');
      }
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await contactService.delete(id);
      toast.success('Message deleted');
      fetchMessages();
      if (selectedMessage?._id === id) {
        setModalOpen(false);
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Messages</h1>

        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message._id} hover className="cursor-pointer" onClick={() => handleViewMessage(message)}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-lg ${message.read ? 'bg-gray-100 dark:bg-gray-800' : 'bg-primary-100 dark:bg-primary-900'}`}>
                    {message.read ? <MailOpen className="text-gray-500" size={20} /> : <Mail className="text-primary-500" size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold">{message.name}</h3>
                      {!message.read && (
                        <span className="px-2 py-0.5 bg-primary-500 text-white rounded-full text-xs">New</span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary mb-1">{message.email}</p>
                    <p className="font-medium mb-1">{message.subject}</p>
                    <p className="text-sm text-text-secondary line-clamp-2">{message.message}</p>
                    <p className="text-xs text-text-secondary mt-2">
                      {new Date(message.createdAt).toLocaleDateString()} at {new Date(message.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Trash2 size={16} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(message._id);
                  }}
                  className="text-red-500"
                />
              </div>
            </Card>
          ))}
        </div>

        {selectedMessage && (
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Message Details">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-text-secondary">From</label>
                <p className="font-semibold">{selectedMessage.name}</p>
              </div>
              <div>
                <label className="text-sm text-text-secondary">Email</label>
                <p className="font-semibold">{selectedMessage.email}</p>
              </div>
              <div>
                <label className="text-sm text-text-secondary">Subject</label>
                <p className="font-semibold">{selectedMessage.subject}</p>
              </div>
              <div>
                <label className="text-sm text-text-secondary">Message</label>
                <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div>
                <label className="text-sm text-text-secondary">Received</label>
                <p>{new Date(selectedMessage.createdAt).toLocaleString()}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => handleDelete(selectedMessage._id)}
                icon={<Trash2 size={16} />}
                className="w-full text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              >
                Delete Message
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;
