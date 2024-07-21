"use client";
import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGraph } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export function Avatar({ speak, ...props }) {
  // Load and clone the GLTF model
  const { scene } = useGLTF('/models/669ca74d7b8266b463f9b8e8.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  // Log nodes to verify their structure
  console.log('Nodes:', nodes);
  console.log('Materials:', materials);

  // Define morph target indices based on available morph targets
  const morphTargetIndices = {
    mouthOpen: nodes.Wolf3D_Head?.morphTargetDictionary?.['mouthOpen'] ?? -1,
    mouthSmile: nodes.Wolf3D_Head?.morphTargetDictionary?.['mouthSmile'] ?? -1,
    mouthFrown: nodes.Wolf3D_Head?.morphTargetDictionary?.['mouthFrown'] ?? -1,
    eyebrowRaise: nodes.Wolf3D_Head?.morphTargetDictionary?.['browInnerUp'] ?? -1,
    eyebrowFrown: nodes.Wolf3D_Head?.morphTargetDictionary?.['browDownLeft'] ?? -1,
    // eyeBlink: nodes.Wolf3D_Head?.morphTargetDictionary?.['eyesClosed'] ?? -1,
  };

  // Update facial expressions based on `speak` prop
  const updateFacialExpressions = (time) => {
    if (speak) {
      const speed = 4; // Increase the speed of talking
      if (morphTargetIndices.mouthOpen >= 0) nodes.Wolf3D_Head.morphTargetInfluences[morphTargetIndices.mouthOpen] = (Math.sin(time * speed) + 1) / 2;
      if (morphTargetIndices.mouthSmile >= 0) nodes.Wolf3D_Head.morphTargetInfluences[morphTargetIndices.mouthSmile] = (Math.cos(time * speed) + 1) / 5;
      if (morphTargetIndices.mouthFrown >= 0) nodes.Wolf3D_Head.morphTargetInfluences[morphTargetIndices.mouthFrown] = (Math.sin(time * speed + Math.PI / 2) + 1) / 2;
      if (morphTargetIndices.eyebrowRaise >= 0) nodes.Wolf3D_Head.morphTargetInfluences[morphTargetIndices.eyebrowRaise] = (Math.cos(time * speed) + 1) / 2;
      if (morphTargetIndices.eyebrowFrown >= 0) nodes.Wolf3D_Head.morphTargetInfluences[morphTargetIndices.eyebrowFrown] = (Math.sin(time * speed + Math.PI) + 1) / 2;
      // if (morphTargetIndices.eyeBlink >= 0) nodes.Wolf3D_Head.morphTargetInfluences[morphTargetIndices.eyeBlink] = (Math.sin(time * speed * 2) > 0.5) ? 1 : 0;
    } else {
      Object.values(morphTargetIndices).forEach(index => {
        if (index >= 0) nodes.Wolf3D_Head.morphTargetInfluences[index] = 0;
      });
    }
  };

  // Update body movements based on `speak` prop
  const updateBodyMovements = (time) => {
    if (speak) {
      const speed = 2; // Speed of body movements
      if (nodes.Hips) nodes.Hips.rotation.y = Math.sin(time * speed) * 0.1;
      if (nodes.Spine) nodes.Spine.rotation.y = Math.sin(time * speed) * 0.05;
      if (nodes.Neck) nodes.Neck.rotation.y = Math.sin(time * speed) * 0.05;
      if (nodes.Head) nodes.Head.rotation.y = Math.sin(time * speed) * 0.05;
      if (nodes.LeftArm) nodes.LeftArm.rotation.z = Math.sin(time * speed) * 0.2;
      if (nodes.RightArm) nodes.RightArm.rotation.z = -Math.sin(time * speed) * 0.2;
    } else {
      if (nodes.Hips) nodes.Hips.rotation.y = 0;
      if (nodes.Spine) nodes.Spine.rotation.y = 0;
      if (nodes.Neck) nodes.Neck.rotation.y = 0;
      if (nodes.Head) nodes.Head.rotation.y = 0;
      if (nodes.LeftArm) nodes.LeftArm.rotation.z = 0;
      if (nodes.RightArm) nodes.RightArm.rotation.z = 0;
    }
  };

  // Use frame updates
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    updateFacialExpressions(elapsedTime);
    updateBodyMovements(elapsedTime);
  });

  // Load animations
  const { animations: meetingAnimation } = useFBX('/animations/Having A Meeting, Male (1).fbx');
  const { animations: talkingAnimation } = useFBX('/animations/Talking.fbx');
  const { animations: idleAnimation } = useFBX('/animations/Sitting Idle.fbx');

  meetingAnimation[0].name = "Meeting";
  talkingAnimation[0].name = "Talking";
  idleAnimation[0].name = "Idle";

  const group = useRef();
  const { actions } = useAnimations([meetingAnimation[0], talkingAnimation[0], idleAnimation[0]], group);

  useEffect(() => {
    if (speak) {
      actions['Meeting']?.reset().fadeIn(0.5).play();
    } else {
      actions['Idle']?.fadeIn(0.5).play();
    }
  }, [speak, actions]);

  return (
    <group {...props} ref={group} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh geometry={nodes.Wolf3D_Glasses.geometry} material={materials.Wolf3D_Glasses} skeleton={nodes.Wolf3D_Glasses.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
      <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
      <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
    </group>
  );
}
useGLTF.preload('/models/669ca74d7b8266b463f9b8e8.glb');
