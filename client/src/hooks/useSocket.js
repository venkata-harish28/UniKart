import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { addNotification } from '../store/slices/notificationSlice';
import { addMessage } from '../store/slices/chatSlice';

export const useSocket = () => {
  const socketRef = useRef(null);
  const { user, token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || !token) return;

    socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token }, withCredentials: true,
    });

    socketRef.current.emit('join', user._id);

    socketRef.current.on('new_message', ({ chatId, message }) => {
      dispatch(addMessage({ chatId, message }));
    });

    socketRef.current.on('notification', (notification) => {
      dispatch(addNotification(notification));
    });

    return () => { socketRef.current?.disconnect(); };
  }, [user, token]);

  return socketRef.current;
};