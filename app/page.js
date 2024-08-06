'use client'
import Image from "next/image";
import { useState,useEffect } from "react";
import {firestore} from '@/firebase'
import {Box,Modal,white, Stack, Typography, TextField, Button} from '@mui/material'
import {collection,doc,getDoc, deleteDoc, getDocs, query, setDoc} from 'firebase/firestore'
import { blue } from "@mui/material/colors";

export default function Home() {
  const [inventory,setInventory]=useState([])
  const [open,setOpen] =useState(false)
  const[itemname, setItemname] =useState('')

  const updateInventory = async () =>{
    const snapshot=query(collection(firestore,'inventory'))
    const docs =await getDocs(snapshot)
    const inventoryList=[]
    docs.forEach((doc)=>{
      inventoryList.push({
        name:doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)

  }
  const additem=async(item)=>{
    const docref=doc(collection(firestore,'inventory'),item)
    const docsnap=await getDoc(docref)

    if(docsnap.exists()){
      const {quantity}=docsnap.data()
    
        await setDoc(docref,{quantity:quantity+1})
      }else{
        await setDoc(docref,{quantity:1})

      }
      await updateInventory()

    }
  
  const removeitem=async(item)=>{
    const docref=doc(collection(firestore,'inventory'),item)
    const docsnap=await getDoc(docref)

    if(docsnap.exists()){
      const {quantity}=docsnap.data()
      if(quantity==1){
        await deleteDoc(docref)
      }else{
        await setDoc(docref,{quantity:quantity-1})
      }
    }
    await updateInventory()
  }
  useEffect(()=>
    {
      updateInventory()
    },[])

  const handleOpen=()=>setOpen(true)
  const handleClose=()=>setOpen(false)



  return( <Box width="100vw"
    flexDirection="column"
  height="100vh" display="flex" justifyContent="center" alignItems="center"
  gap={2}>
    <Modal open={open} onClose={handleClose}>
      <Box
      position="absolute" top="50%"
      left="50%" 
      width={400} bgcolor="white" border="2px  solid #000"
      boxShadow={24} p={4} display="flex" flexDirection="column" gap={3}
      sx={{ transform:"translate(-50%,-50%)"}}
      >
        <Typography variant="h6">
         Add ITEM
        </Typography>
        <Stack width="100%" direction="row" spacing={2}>
         <TextField
         variant="outlined"
         fullWidth
         value={itemname}
         onChange={(e)=>{
          setItemname(e.target.value)
         }}
         />
         <Button  variant="outlined" onClick={()=>{
          additem(itemname)
          setItemname('')
          handleClose()
         }}> ADD</Button>
        </Stack>
      </Box>
    </Modal>
    <Button  variant="contained"
    onClick={()=>{
      handleOpen()
    }}
    >
      Add new item
    </Button>
    <Box border="1px solid #333">
      <Box width="800px" height="100px" bgcolor="#ADD8E6">
    <Typography variant="h2"  display = "flex" alignItems="center" justifyContent="center"> Inventory items</Typography>
      </Box>
    </Box>
    <Stack width="800px"  height="300px" spacing={2} overflow="auto">
      {
        inventory.map(({name,quantity})=>(
          <Box
          key={name}
          width="100#"
          height="150px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgcolor="#f0f0f0"
          padding={5} >
            
            <Typography bgcolor="solid #333"> {name}</Typography>
            <Typography bgcolor="solid #333"> {quantity}</Typography>
            <Button
            variant="contained"
            onClick={
              ()=>removeitem(name)
            }
            >
                Remove
            </Button>
          </Box>
        ))
      }

    </Stack>
    </Box>
      )

}
