"use client";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import styles from "./CourseCardsBlock.module.css";

export default function CourseFilters({ age, direction, setAge, setDirection }) {
  const handleChangeAge = (event) => setAge(event.target.value);
  const handleChangeDirection = (event) => setDirection(event.target.value);

  return (
    <div className={styles.filters}>
      <FormControl
        fullWidth
        color="blue"
        sx={{
          "& .MuiFormLabel-root": { fontWeight: 500 },
          "& .MuiInputBase-input": { fontWeight: 500 },
        }}
      >
        <InputLabel id="age-select-label" color="blue">
          Возраст
        </InputLabel>
        <Select
          labelId="age-select-label"
          id="age-select"
          value={age}
          label="Возраст"
          onChange={handleChangeAge}
          color="blue"
          MenuProps={{
            sx: {
              "& .MuiMenuItem-root": { fontWeight: 500 },
              "& .MuiMenuItem-root.Mui-selected": { backgroundColor: "#eef2fe" },
            },
          }}
        >
          <MenuItem color="blue" value={""}>
            Не выбран
          </MenuItem>
          <MenuItem color="blue" value={"3-6"}>
            3-6 лет
          </MenuItem>
          <MenuItem color="blue" value={"7-10"}>
            7-10 лет
          </MenuItem>
          <MenuItem color="blue" value={"11-14"}>
            11-14 лет
          </MenuItem>
          <MenuItem color="blue" value={"15-18"}>
            15-18 лет
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl
        fullWidth
        color="blue"
        sx={{
          "& .MuiFormLabel-root": { fontWeight: 500 },
          "& .MuiInputBase-input": { fontWeight: 500 },
        }}
      >
        <InputLabel id="direction-select-label" color="blue">
          Направление
        </InputLabel>
        <Select
          labelId="direction-select-label"
          id="direction-select"
          value={direction}
          label="Направление"
          onChange={handleChangeDirection}
          color="blue"
          MenuProps={{
            sx: {
              "& .MuiMenuItem-root": { fontWeight: 500 },
              "& .MuiMenuItem-root.Mui-selected": { backgroundColor: "#eef2fe" },
            },
          }}
        >
          <MenuItem color="blue" value={""}>
            Не выбран
          </MenuItem>
          <MenuItem color="blue" value={"pacman"}>
            Игры
          </MenuItem>
          <MenuItem color="blue" value={"robot"}>
            Робототехника
          </MenuItem>
          <MenuItem color="blue" value={"dron"}>
            Дроны
          </MenuItem>
          <MenuItem color="blue" value={"programming"}>
            Программирование
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
