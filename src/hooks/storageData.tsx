import React, { 
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageDataProviderProps {
  children: ReactNode;
}

interface StorageData {
  id: string;
  title: string;
  email: string;
  password: string;
}

interface StorageDataContextProps {
  storageData: StorageData[];
  storageDataLoading: boolean;
  insertStorageData(storageData: StorageData[]): Promise<void>;
}

const StorageDataContext = createContext({} as StorageDataContextProps);

function StorageDataProvider({ children }: StorageDataProviderProps) {
  const [storageData, setStorageData] = useState<StorageData[]>([]);
  const [storageDataLoading, setStorageDataLoading] = useState(true);

  const dataKey = '@passmanager:logins';

  async function insertStorageData(storageData: StorageData[]) {
    await AsyncStorage.setItem(dataKey, JSON.stringify(storageData));
    setStorageData(storageData);
  }
  
  useEffect(() => {
    async function loadStorageData() {
      const response = await AsyncStorage.getItem(dataKey);

      if(response) {
        const currentStorageData = JSON.parse(response) as StorageData[];
        setStorageData(currentStorageData);
      }
      setStorageDataLoading(false);
    }

    loadStorageData();

  }, []);

  return (
    <StorageDataContext.Provider value={{ storageData, storageDataLoading, insertStorageData }}>
      {children}
    </StorageDataContext.Provider>
  );
}

function useStorageData() {
  const context = useContext(StorageDataContext);

  return context;
}

export {StorageDataProvider, useStorageData};
